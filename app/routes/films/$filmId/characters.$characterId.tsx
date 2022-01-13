import { LoaderFunction, useCatch, useLoaderData } from "remix";
import { getFilmCharacter } from "~/api/films";

export const loader: LoaderFunction = async ({ params }) => {
    const { characterId } = params;

    if (!characterId) {
        return;
    }

    const character = await getFilmCharacter(characterId);
    console.log("this is the character => ", character);

    console.log("this is a creacter 🚀👦👦👦👦👦👦👦👦👦👦=>", character);
    return {
        character,
    };
};

export default function Character() {
    const { character } = useLoaderData();
    console.log(character);
    return (
        <div className="mb-3">
            <div className="text-3xl mb-2">Character Details</div>
            <div className="p-4 rounded shadow-lg border">
                <div className="text-gray-700 font-bold text-xl mb-2">
                    {character.name}
                </div>
                <ul className="py-2">
                    <li>Gender: {character.gender}</li>
                    <li>Age: {character.age}</li>
                    <li>Eye Color: {character.eye_color}</li>
                    <li>Hair Color: {character.hair_color}</li>
                </ul>
            </div>
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();
    return (
        <div className="mb-3">
            <div className="text-3xl mb-2">Details</div>
            <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
                <div className="text-gray-700 font-bold text-xl mb-2">
                    Uh oh... Sorry something went wrong!
                </div>
                <p>Error {caught.status} 😢</p>
            </div>
        </div>
    );
}
