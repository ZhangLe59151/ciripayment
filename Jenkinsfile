def label = "slave-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
  containerTemplate(name: "npm", image: 'registry.silot.tech/common/jenkins-npm:latest', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'helm', image: 'cnych/helm', command: 'cat', ttyEnabled: true)
], volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  hostPathVolume(mountPath: '/root/.kube', hostPath: '/root/.kube')
]) {
  node(label) {
    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH
    def imageTag = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    def dockerRegistryUrl = "registry.silot.tech"
    def imageEndpoint = "taokae_mvp"
    def image = "${dockerRegistryUrl}/taokae/${imageEndpoint}"

    stage('单元测试') {
        echo "1. 单元测试阶段"
    }
    stage('编译服务') {
        echo "2. 远程编译阶段"
        withCredentials([[$class: 'UsernamePasswordMultiBinding',
        credentialsId: 'dockerhub',
        usernameVariable: 'DOCKER_HUB_USER',
        passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
          container('npm') {
            sh """
               npm install 
               npm run build-test-web
               """
          }
        } 
    }
    stage('构建Docker镜像') {
        echo "3. 构建镜像阶段"
        withCredentials([[$class: 'UsernamePasswordMultiBinding',
        credentialsId: 'dockerhub',
        usernameVariable: 'DOCKER_HUB_USER',
        passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
          container('docker') {
            sh """
              docker login ${dockerRegistryUrl} -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD}
              """
          }
      }
    }
    stage('helm部署服务') {
        echo "4. helm部署服务阶段"
        container('helm') {
            sh """
               echo "Hello, World"
               """
        }
    }
  }
}
