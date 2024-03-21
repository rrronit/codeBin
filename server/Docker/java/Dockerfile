FROM openjdk:latest

WORKDIR /judge/



CMD ["sh", "-c", "javac *.java && java $(basename *.java .java)"]
