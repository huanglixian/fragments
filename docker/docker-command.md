# docker 命令（本项目）

## 0. 登录镜像仓库

```bash
docker login docker.cnb.cool -u cnb -p 7FTxER23109aSdK1OplKAbQkkQD
```

## 1. 构建镜像（在本机 mac 上执行）

确保本机已有 `node:20-alpine-amd64` 基础镜像标签。

```bash
docker build --platform linux/amd64 -f docker/dockerfile -t docker.cnb.cool/huanglixian/gdy-docker/fragments:latest .
```

## 2. 推送镜像

```bash
docker push docker.cnb.cool/huanglixian/gdy-docker/fragments:latest
```

## 3. 服务器启动/更新（在服务器上执行）

将 `docker-compose.yml` 下载到服务器任意目录后执行：

```bash
docker compose up -d
```

更新镜像并重启：

```bash
docker compose pull && docker compose up -d
```

停止服务：

```bash
docker compose down
```
