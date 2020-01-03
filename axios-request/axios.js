async function getWeather() {
    let city = document.getElementById('input').value;
    const response = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&apikey=4bc1891c7ef2e8cfb0efe57e324da71d\n`,
      method: 'get'
    })
    console.log(response);
    let oldChild;
    let mintemp = response.data.main.temp_min;
    let maxtemp = response.data.main.temp_max;
    if(response.statusText === 'OK'){
        let main = response.data.weather[0].main;
        let divForAtm = document.createElement('div');
        divForAtm.innerHTML = `Weather in ${city} is: <br>
                               main: ${main}<br>
                               min temperature: ${mintemp}<br>
                               max temperature: ${maxtemp}`;              
        
        if(oldChild){
            document.body.replaceChild(divForAtm, oldChild );
        } else {
            document.body.append(divForAtm);
        }
        oldChild = divForAtm;
    }
    else {
        alert('error in server');
    }
  }
    