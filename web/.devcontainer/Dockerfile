FROM node:16

ARG USER=web
ARG WORKSPACES=/workspaces/web

SHELL [ "/bin/bash", "-c" ]

RUN userdel -r node
RUN useradd -m ${USER} -u 1000 -s /bin/bash

WORKDIR /home/${USER}

RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir -p /commandhistory /home/${USER}/.vscode-server/extensions ${WORKSPACES}/node_modules \
    && touch /commandhistory/.bash_history \
    && chown -R ${USER}:${USER} /commandhistory /home/${USER}/.vscode-server ${WORKSPACES}/node_modules \
    && echo $SNIPPET >> "/home/${USER}/.bashrc"

RUN sh -c "$(curl -fsSL https://starship.rs/install.sh)" -- --yes && \
    echo 'eval "$(starship init bash)"' >> .bashrc
