import { LoaderFunction, MetaFunction, Outlet, useLoaderData } from "remix";
import { getFilms, getFilmById, Film } from "~/api/films";
import CharacterList from "~/components/CharacterList";
import FilmBanner from "~/components/FilmBanner";

type LoaderData = {
    film: Film;
};

export const meta: MetaFunction = ({ data }) => {
    const { film } = data;
    return {
        title: film.title,
        description: film.description,
    };
};

export const loader: LoaderFunction = async ({ params }) => {
    const { filmId } = params;

    if (!filmId)
        return {
            error: "El id no existe:/",
        };

    const film = await getFilmById(filmId);
    // console.log("📷🚀👦= Personajes => ", film);
    return {
        film,
    };
};

export default function Film() {
    const { film } = useLoaderData<LoaderData>();
    return (
        <div>
            <FilmBanner film={film} />

            <section>
                <p>{film.description}</p>
            </section>

            <section className="flex py-5 space-x-5">
                <CharacterList characters={film.allCharacters} />

                <article className="flex-1">
                    <Outlet />
                </article>
            </section>
        </div>
    );
}
