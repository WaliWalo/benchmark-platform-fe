const url = process.env.REACT_APP_BE_URL;
export async function postExam(data, optionSelected, optionValue) {
  try {
    let newUrl = url;
    if (optionSelected === "Number of Questions") {
      newUrl = `${url}/exam/start/?noQues=${optionValue}`;
    } else if (optionSelected === "Duration") {
      let hour = optionValue.slice(0, 2);
      let min = optionValue.slice(3, 5);
      let seconds = parseInt(hour) * 3600 + parseInt(min) * 60;
      console.log(seconds);
      newUrl = `${url}/exam/start/?duration=${seconds}`;
    }
    let response = await fetch(`${newUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      let error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

export async function postAnswer(examId, answer) {
  try {
    let response = await fetch(`${url}/exam/${examId}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      let error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

export async function getResult(examId) {
  try {
    let response = await fetch(`${url}/exam/${examId}`);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      let error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}
