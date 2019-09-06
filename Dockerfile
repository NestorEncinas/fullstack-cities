FROM node
RUN npm i -g yarn

# Create app directory 

# Install app dependencies
# COPY ./package.json .
#COPY ./packages/server/package.json ./packages/server/

WORKDIR /fullstack-cities

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/

COPY ./packages/server/build ./packages/server/build
COPY ./packages/server/.env ./packages/server/.env

COPY ./ormconfig.js .

RUN yarn install --production

WORKDIR ./packages/server

RUN ls




# COPY . /packages/

# # COPY ./packages/server/ /packages/server/
# WORKDIR /packages/packages/server/

# # ENV NODE_ENV production
# RUN export NODE_ENV=production

# # RUN yarn install

# RUN ["yarn", "build"]

#COPY ./packages/server/build ./packages/server/
#copy prod env file how?
#copy db prod connection how?

EXPOSE 4000

CMD ["node", "build/index.js"]