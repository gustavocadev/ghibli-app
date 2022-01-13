import films from "~/routes/films";

export type FilmCharacter = {
    id: string
    name: string
    gender?: string 
    age?: string
    eye_color?: string
    hair_color?: string 
}

export type Film = {
    id: string
    title: string
    original_title: string
    description: string
    image: string
    movie_banner: string
    people: string[]
    allCharacters?: FilmCharacter[]
}


export const getFilms = async (title?: string | null) => {
    const res = await fetch(`https://ghibliapi.herokuapp.com/films`);
    const films: Film[] = await res.json();

    return films.filter((film) => (
        title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
    ))
}

export const getFilmById = async (id: string) => {
    const res = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`);
    const film: Film = await res.json();

    
    const characters = film.people.filter(url => url !== 'https://ghibliapi.herokuapp.com/people/')

    const allCharacters = await Promise.all(characters.map(async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }))

    return {...film, allCharacters }

}



export const getFilmCharacter = async (characterId: string): Promise<FilmCharacter> => {
    const res = await fetch(`https://ghibliapi.herokuapp.com/people/${characterId}`)
    
    if (!res.ok) {
        throw res;
    } 

    const character = await res.json()

    console.log('📖📖📖=>', character)
    return character
}