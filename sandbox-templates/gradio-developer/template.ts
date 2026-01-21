import { Template, waitForPort } from 'e2b'
export const template = Template()
  .fromPythonImage('3.9-slim')
  .aptInstall('curl') // required for waitForPort()
  .pipInstall([
    'gradio',
    'huggingface_hub==0.23.4',
    'pandas',
    'numpy',
    'matplotlib',
    'requests',
    'seaborn',
    'plotly',
  ])
  .setWorkdir('/home/user')
  .runCmd(
    `cat <<'EOF' > /home/user/app.py
# Gradio 示例
import gradio as gr

def greet(name, intensity):
    return "Hello, " + name + "!" * int(intensity)

demo = gr.Interface(
    fn=greet,
    inputs=["text", "slider"],
    outputs=["text"],
)

demo.launch(server_name="0.0.0.0", server_port=7860)
EOF`,
  )
  .setStartCmd('python app.py', waitForPort(7860))
