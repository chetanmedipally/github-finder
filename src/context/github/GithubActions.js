 import axios from "axios"

 const githubAxios = axios.create({
     baseURL : process.env.REACT_APP_GITHUB_URL,
     headers : {Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}`}
 })
 //Search Users
export const searchUsers = async (text) => {

    const params = new URLSearchParams({
      q: text
    })
    const response = await githubAxios.get(`/search/users?${params}`)
    
    return response.data.items
  }

//Get user and repos
export const getUserAndRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page : 10
      })

    const [user,repos] = await Promise.all([
        githubAxios.get(`/users/${login}`),
        githubAxios.get(`/users/${login}/repos?${params}`)
    ])

    return {user : user.data, repos : repos.data}
}
