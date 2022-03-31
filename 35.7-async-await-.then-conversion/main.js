const {
    generateMessage,
    goodbye,
    generateSlogan,
  } = require("../utils/slogan-generator");
  
  
  async function getSlogan(request) {
    const response = await generateSlogan(request);
    console.log(`Your request was: ${request}`);
      console.log(`Your slogan is: ${response.slogan}`)
  }
  
  
  
  async function fullSession(request) {
    const response = await generateMessage();
    console.log(response);
    const slogan = await getSlogan(request);
    const bye = await goodbye()
    console.log(bye);
  }
  
  module.exports = { getSlogan, fullSession };