docker build -t checklist .
docker run -d --name checklist -p 4041:4041 checklist
