;(() => {
    !JSON.parse(localStorage.getItem('users')) &&
        localStorage.setItem(
            'users',
            JSON.stringify([
                {
                    username: 'johndoe221',
                    email: 'johndoe@example.com',
                    password: 'Password123!',
                    firstname: 'John',
                    lastname: 'Doe',
                },
                {
                    username: 'janedoe69',
                    email: 'janedoe@example.com',
                    password: 'Password456!',
                    firstname: 'Jane',
                    lastname: 'Doe',
                },
                {
                    username: 'petersmithxD',
                    email: 'petersmith@example.com',
                    password: 'Password789!',
                    firstname: 'Peter',
                    lastname: 'Smith',
                },
                
            ])
        )
})()

let LoginUser =
    JSON.parse(localStorage.getItem('users')).find((user) => user.isLogin) || {}

const init = (() => {
    LoginUser.isLogin && (location.href = './results.html')
})()

const signin = document.getElementById('signin')
const loginUsername = document.getElementById('loginUsername')
const loginPassword = document.getElementById('loginPassword')

signin.addEventListener('submit', (e) => {
    e.preventDefault()
    validationSignIn()

    if (isFormValid() && valid()) {
        const users = JSON.parse(localStorage.getItem('users')) || []
        localStorage.setItem(
            'users',
            JSON.stringify(
                users.map((user) =>
                    user.username === loginUsername.value
                        ? { ...user, isLogin: true }
                        : user
                )
            )
        )

        signin.submit()
    }
})

function valid() {
    const loginUsername = document.getElementById('loginUsername').value
    const loginPassword = document.getElementById('loginPassword').value
    const container = document.getElementById('container')
    const registerBtn = document.getElementById('register')
    const loginBtn = document.getElementById('login')

    registerBtn.addEventListener('click', () => {
        container.classList.add('active')
    })

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active')
    })
    // Mock data
    let mockData = JSON.parse(localStorage.getItem('users')) || []

    // Check if the username and password are correct
    const user = mockData.find(
        (item) =>
            item.username === loginUsername && item.password === loginPassword
    )

    if (user) {
        alert('Login Successfully!')
        return true
    } else {
        alert("Account doesn't exist!")
        return false
    }
}

function validationSignIn() {
    const usernameValue = loginUsername.value.trim()
    const passwordValue = loginPassword.value.trim()

    //username
    if (usernameValue === '') {
        setErrorFor(loginUsername, 'Username cannot be blank')
    } else if (usernameValue.length <= 2) {
        setErrorFor(loginUsername, 'minimum of 3 characters')
    } else {
        setSuccessFor(loginUsername)
    }

    //password
    if (passwordValue === '') {
        setErrorFor(loginPassword, 'Password cannot be blank')
    } else if (passwordValue.length <= 7) {
        setErrorFor(loginPassword, 'Minimum of 8 characters')
    } else if (passwordValue.search(/[0-9]/) == -1) {
        setErrorFor(loginPassword, 'At least One number')
    } else if (passwordValue.search(/[a-z]/) == -1) {
        setErrorFor(loginPassword, 'At least One Lowercase character')
    } else if (passwordValue.search(/[A-Z]/) == -1) {
        setErrorFor(loginPassword, 'At least One Uppercase character')
    } else if (
        passwordValue.search(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\<\<\>\?]/) == -1
    ) {
        setErrorFor(loginPassword, 'At least one Special character')
    } else {
        setSuccessFor(loginPassword)
    }

    return true
}

function setErrorFor(input, message) {
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText = message

    formControl.className = 'form-control error'
}
function setSuccessFor(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

const container = document.getElementById('container')
const registerBtn = document.getElementById('register')
const loginBtn = document.getElementById('login')

registerBtn.addEventListener('click', () => {
    container.classList.add('active')
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active')
})

//sign up validation
const form = document.getElementById('form')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')

form.addEventListener('submit', (e) => {
    checkInputs()

    if (isFormValid() == true && register() == true) {
        form.submit()
    } else {
        e.preventDefault()
    }
})

//LOCAL STORAGE
function register() {
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const users = JSON.parse(localStorage.getItem('users')) || []

    // Check if username or email already exists
    const isUsernameDuplicate = users.some(
        (user) => user.username === username
    )
    const isEmailDuplicate = users.some(
        (user) => user.email === email
    )
    const isBothDuplicate = users.some(
        (user) => user.username === username &&  user.email === email
        )   
    if (isBothDuplicate) {
            alert(
                'Username and Email is already used. Please choose different one.'
            )
            return false 
    }
    else if (isUsernameDuplicate) {
        alert(
            'Username is already used. Please choose different one.'
        )
        return false
    }
    else if (isEmailDuplicate) {
        alert(
            'Email is already used. Please choose different one.'
        )
        return false
    }
    else if (isBothDuplicate) {
        alert(
            'Username and Email is already used. Please choose different one.'
        )
        return false
    }
    //set items
    const newUser = { username, email, password, firstname, lastname }
    users.push(newUser)

    //registration successful
    localStorage.setItem('users', JSON.stringify(users))
    alert('Registration successful!')

    return true
}

//mock data
function isFormValid() {
    const inputContainers = form.querySelectorAll('.form-control')
    let result = true
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false
        }
    })
    return result
}

const isEmail = (emailValue) => {
    var atSymbol = emailValue.indexOf('@')
    if (atSymbol < 1) return false
    var dot = emailValue.lastIndexOf('.')
    if (dot <= atSymbol + 2) return false
    if (dot === emailValue.length - 1) return false
    return true
}

function checkInputs() {
    const firstnameValue = firstname.value.trim()
    const lastnameValue = lastname.value.trim()
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()

    //firstname
    if (firstnameValue === '') {
        setErrorFor(firstname, 'First name cannot be blank')
    } else if (firstnameValue.length <= 2) {
        setErrorFor(firstname, 'minimum of 3 characters')
    } else {
        setSuccessFor(firstname)
    }

    //lastname
    if (lastnameValue === '') {
        setErrorFor(lastname, 'Last name cannot be blank')
    } else if (lastnameValue.length <= 2) {
        setErrorFor(lastname, 'minimum of 3 characters')
    } else {
        setSuccessFor(lastname)
    }

    //username
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank')
    } else if (usernameValue.length <= 2) {
        setErrorFor(username, 'minimum of 3 characters')
    } else {
        setSuccessFor(username)
    }

    //email
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank')
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid')
    } else {
        setSuccessFor(email)
    }

    //password
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank')
    } else if (passwordValue.length <= 7) {
        setErrorFor(password, 'Minimum of 8 characters')
    } else if (passwordValue.search(/[0-9]/) == -1) {
        setErrorFor(password, 'At least One number')
    } else if (passwordValue.search(/[a-z]/) == -1) {
        setErrorFor(password, 'At least one lowercase character')
    } else if (passwordValue.search(/[A-Z]/) == -1) {
        setErrorFor(password, 'At least one uppercase character')
    } else if (
        passwordValue.search(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\<\<\>\?]/) == -1
    ) {
        setErrorFor(password, 'At least one Special character')
    } else {
        setSuccessFor(password)
    }
    return true
}

function setErrorFor(input, message) {
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText = message

    formControl.className = 'form-control error'
}
function setSuccessFor(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}
