const wrapper = document.querySelector('.wrapper'),
  editableInput = wrapper.querySelector('.editable'),
  readonlyInput = wrapper.querySelector('.readonly'),
  counter = wrapper.querySelector('.counter'),
  button = wrapper.querySelector('button')



editableInput.onkeyup = (e) => {
  let element = e.target
  validated(element)
}
editableInput.onkeypress = (e) => {
  let element = e.target
  validated(element)

}

function validated(element) {
  let text
  let maxLength = 100
  let currentlength = element.innerText.length

  if (currentlength <= 0) {

    counter.style.display = 'none'
    button.classList.remove('active')
  } else {

    counter.style.display = 'block'
    button.classList.add('active')
  }

  counter.innerText = maxLength - currentlength

  if (currentlength > maxLength) {
    let overText = element.innerText.substr(maxLength) //extracting over texts
    overText = `<span class="highlight">${overText}</span>` //creating new span and passing over texts
    text = element.innerText.substr(0, maxLength) + overText //passing overText value in textTag variable
    readonlyInput.style.zIndex = '1'
    counter.style.color = '#e0245e'
    button.classList.remove('active')
  } else {
    readonlyInput.style.zIndex = '-1'
    counter.style.color = '#333'
  }
  readonlyInput.innerHTML = text //replacing innerHTML of readonly div with textTag value
}