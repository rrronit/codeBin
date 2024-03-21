FROM gcc:latest
WORKDIR /judge/


CMD if [ -f "./code.c" ]; then \
        gcc -o ./code ./code.c && \
        ./code; \
    else \
        g++ -o ./code ./code.cpp && \
        ./code; \
    fi
