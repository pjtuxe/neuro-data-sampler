const { Notion } = require("@neurosity/notion")
const config = require("./config")

const notion = new Notion({ deviceId: config.notion.deviceId });

module.exports = async () => {
  await notion
    .login({
      email: config.notion.email,
      password: config.notion.password
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    })
  return notion
}
