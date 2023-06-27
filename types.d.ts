interface Genre {
    id : number
    name : string
}

interface Company {
    id : number
    logo_path : string
    name : string
    origin_country : string
}

interface Country {
    iso_3166_1: string
    name: string
}

interface Language {
    english_name : string
    iso_639_1 : string
    name : string
}

interface Cast {
    adult : boolean
    gender : number
    id : number
    known_for_department : string
    name: string
    original_name : string
    popularity : number
    profile_path : string
    cast_id : number
    character : string
    credit_id : string
    order : number
}

interface Crew {
    adult : boolean
    gender : number
    id : number
    known_for_department : string
    name: string
    original_name : string
    popularity : number
    profile_path : string
    credit_id : string            
    department : string
    job : string
}

interface Credit {
    cast : Cast[]
    crew : Crew[]
}

interface Movie {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: string
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: Company[]
    production_countries: Country[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: Language[]
    status: string
    tagline : string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    credits: Credit
    
}

interface supaElokuva {
    nimi : string
    alkuperainennimi : string
    genre : string[]
    valmistumisvuosi : number
    _id : string
    created_at : string
    tmdbkuva : string
}