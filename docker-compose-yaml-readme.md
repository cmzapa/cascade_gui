# Cascade_gui Docker Compose Yaml  

### Docker engine release 17.06.0+   
version: "3.3"  
### Configuration applied to each container  
services:  

# Cascade container  
Container name  
* cascade_gui:  

Names the container  
* container_name: cascade_gui  

Configuration options applied at build time  
* build:  

Object path  
* context: .  

Build path from existing dockerfile  
* dockerfile: Dockerfile  
 
Instructions for creating the container  
* image: cascadegui:latest  

Logging configuration for service  
* logging:  

Specific logging driver  
* driver: "json-file"  

Controls log files and sizes  
* options  
max-size: "200k"  
max-file: "10"  

Port mapping  
* ports:  
`- 3000:80`  

Container will restart unless stopped  
* restart: unless-stopped  

Containers network connection  
* networks:  
`- zai_network`  

Containers network connection  
* networks:  
    zai_network:  
        external: true  
