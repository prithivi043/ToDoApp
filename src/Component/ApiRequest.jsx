

const ApiRequest = async (url = '', optionObt = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionObt)
    if (!response.ok) throw Error('Kindly re-Load the site')
  } catch (err) {
    errMsg = err.Message
  } finally {
    return errMsg
  }
}

export default ApiRequest