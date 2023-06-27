import { Collection, MongoClient, ObjectId } from 'mongodb';

const client : MongoClient= new MongoClient(process.env.DB_URI!);

export interface Elokuva {
    _id : ObjectId
    nimi : string
    alkuperainennimi: string
    valmistumisvuosi : number
    ohjaaja : string[]
    genre : string[]
    tuotantomaa : string[]
    kestomin : number
    imdbid : string
    imdburl : string
    tmdbid : number
    tmdbkuva : string
}

export const haeElokuvat = async () : Promise<any> => {
    await client.connect();

    const elokuvarekisteri : Collection<Elokuva> = client.db().collection("elokuvarekisteri")

    return elokuvarekisteri
                .find({ })
                .sort({_id : -1})
                .limit(40)
                .toArray();

}

export const haeElokuva = async (id : string) : Promise<any> => {
    await client.connect();

    const elokuvarekisteri : Collection<Elokuva> = client.db().collection("elokuvarekisteri")

    return elokuvarekisteri.findOne({_id : new ObjectId(id)});

}

export const haeGenrella = async (haettuGenre : string) : Promise<any> => {
    
    await client.connect();

    const elokuvarekisteri : Collection<Elokuva> = client.db().collection("elokuvarekisteri");
    
    
    return elokuvarekisteri
            .find()
            .filter({genre : haettuGenre})
            .sort({_id : -1})
            .toArray();
}