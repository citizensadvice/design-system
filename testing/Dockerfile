FROM backstopjs/backstopjs

USER root

# prevent apt-get from complaining about lack of TERM
RUN echo 'debconf debconf/frontend select Noninteractive' | sudo debconf-set-selections

RUN apt-get update

RUN sudo apt-get install wait-for-it

ENTRYPOINT ["bash"]
