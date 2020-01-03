async function getWeather() {
    let city = document.getElementById('input').value;
    try {
        const response = await axios({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&apikey=4bc1891c7ef2e8cfb0efe57e324da71d\n`,
            method: 'get'
        })
            let oldChild;
            let mintemp = response.data.main.temp_min;
            let maxtemp = response.data.main.temp_max;
            let main = response.data.weather[0].main;
            let div = document.createElement('div');
            div.innerHTML = `Weather in ${city} is: <br>
                                   main: ${main}<br>
                                   min temperature: ${mintemp}<br>
                                   max temperature: ${maxtemp}`;              
            
            if(oldChild){
                document.body.replaceChild(div, oldChild );
            } else {
                document.body.append(div);
            }
            oldChild = div;
            console.log(response);
      } catch (error) {
        alert(`City entered incorrectly or server error`);
      }

}
