import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { StatsCard } from "../components/StatsCard";
import { Tag } from "../components/Tag";
import { useNavigate, useParams } from "react-router-dom";

interface PokemonType {
  type: {
    name: string;
  };
}

export function Details() {
  const [pokemonName, setPokemonName] = useState<string>('')
  const [pokemonId, setPokemonId] = useState<string>('')
  const [pokemonHeight, setPokemonHeight] = useState<number>(0)
  const [pokemonWeight, setPokemonWeight] = useState<string>('')
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const [background, setBackground] = useState<string>('')

  const navigate = useNavigate()
  const params = useParams()

  function handleBack() {
    navigate(-1)
  }

  useEffect(() => {
    const CatchingSpecificPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        const data = await response.json()

        setImageUrl(data.sprites.other["official-artwork"].front_default)
        setPokemonName(data.name)
        setPokemonId(data.id)
        setPokemonTypes(data.types)
        setPokemonHeight(data.height)
        setPokemonWeight(data.weight)

        if (data.types.length > 0) {
          setBackground(data.types[0].type.name.toLowerCase());
        }

      } catch (error) {
        console.error(error)
      }
    }
    CatchingSpecificPokemon()
  }, [])

  return (
    <>
      <Header image={imageUrl} background={background} onClick={() => handleBack()} />
      <main className="mt-16 mx-4 text-gray-800">
        <div className="bg-card p-6 rounded-xl shadow-lg relative max-w-sm mx-auto">
          <div className="text-center mt-2">
            <h1 className="text-3xl font-bold">{pokemonName}</h1>
            <p className="text-gray-500">{`Nº${pokemonId}`}</p>
          </div>

          <div className="flex justify-center space-x-2 my-4">
            {
              pokemonTypes.length > 0 ? (
                pokemonTypes.map((pokemonType, index) => (
                  <Tag title={pokemonType.type.name} key={index} />
                ))
              ) : (
                <p>Carregando</p>
              )
            }
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatsCard label="Peso" value={`${pokemonWeight} hg`} />
            <StatsCard label="Altura" value={`${pokemonHeight} dm`} />
            <StatsCard label="Categoria" value="Seed" />
            <StatsCard label="Habilidade" value="Overgrow" />
          </div>
        </div>
      </main>
    </>
  );
}

