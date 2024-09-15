import "../search.css"

// const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible =
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            header.textContent = user.name
            body.textContent = user.email
            userCardContainer.append(card)
            return { name: user.name, email: user.email, element: card }
        })
    })

// fetch("https://jsonplaceholder.typicode.com/users", { method: 'POST', headers: { "Authorization": `Bearer ${PUBLISHABLE_KEY}` }})
//     .then(res => res.json())
//     .then(data => {
//         users = data.map(user => {
//             const card = userCardTemplate.content.cloneNode(true).children[0]
//             const header = card.querySelector("[data-header]")
//             const body = card.querySelector("[data-body]")
//             header.textContent = user.name
//             body.textContent = user.email
//             userCardContainer.append(card)
//             return { name: user.name, email: user.email, element: card }
//         })
//     })

function Search() {
    return (
        <body>
            <div class="search-wrapper">
                <label for="search">Search Users</label>
                <input type="search" id="search" data-search />
            </div>
            <div class="user-cards" data-user-cards-container></div>
            <template data-user-template>
                <div class="card">
                    <div class="header" data-header></div>
                    <div class="body" data-body></div>
                </div>
            </template>
        </body>
    );
}

export default Search;
