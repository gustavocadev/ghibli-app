import { getFilms } from "~/api/films";
import {
    LinksFunction,
    MetaFunction,
    LoaderFunction,
    useLoaderData,
    Form,
    ActionFunction,
    NavLink,
} from "remix";

import type { Film } from "~/api/films";

type LoaderData = {
    films: Film[];
};

export const meta: MetaFunction = () => {
    return {
        title: "Films | Studio Ghibli",
        description: "List of films :D",
    };
};

// server side
export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const title = url.searchParams.get("title");

    const films = await getFilms(title);

    return { films };
};

// Client side
export default function FilmsIndex() {
    const { films } = useLoaderData<LoaderData>();
    return (
        <main className="px-16 font-sans">
            <h1 className="text-5xl font-bold text-center py-4">
                Studio Ghibli Films
            </h1>
            <Form>
                <label htmlFor="">
                    <span>Search</span>{" "}
                    <input
                        type="text"
                        name="title"
                        placeholder="Type a title..."
                        className="border-2 rounded p-2"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded m-4"
                >
                    Search
                </button>
            </Form>
            <section className="grid grid-cols-4 gap-4">
                {films.map(({ title, image, id }) => (
                    <NavLink
                        key={id}
                        to={`/films/${id}`}
                        title={title}
                        prefetch="intent"
                        className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
                    >
                        <header>
                            <h2>{title}</h2>
                        </header>
                        <figure>
                            <img src={image} alt="" />
                        </figure>
                    </NavLink>
                ))}
            </section>
        </main>
    );
}
