const API_KEY = 'xxx';
const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inPutElement = document.querySelector('input')
const historElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

function changeInput(value){
    const inPutElement = document.querySelector('input');
    inPutElement.value = value;
};


async function getMessage() {
    console.log("clicked");
    const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo-0301",
            messages:[{role:"user",content:inPutElement.value}],
            max_tokens: 100,
        })
    };
    try{
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json();
        console.log(data);
        outPutElement.textContent = data.choices[0].message.content;
        if(data.choices[0].message.content && inPutElement.value){
            const pElement = document.createElement('p');
            pElement.textContent = inPutElement.value;
            pElement.addEventListener('click', ()=> changeInput(pElement.textContent));
            historElement.append(pElement);
        }

    }catch(error){
        console.error(error);

    }


};

submitButton.addEventListener('click', getMessage);
function clearInput(){
    inPutElement.value = '';
}
buttonElement.addEventListener('click', clearInput);