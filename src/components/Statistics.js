import { useState } from "react"
import {spriteEnum, statusEnum, errorEnum} from "../enums"

function Statistics({status, pokemonData, error}) {

  const [spriteType, setSpriteType] = useState(spriteEnum.front_default)

  let content;
  if (status === statusEnum.isLoading){
    content = <p>Loading...</p>
  }
  else if(status === statusEnum.isError){
    content = <p>{error === errorEnum.not_found ? "Errore : Pokemon non trovato" : error}</p>
  }
  else if(status === statusEnum.isSuccess && pokemonData){
    content = (
      <>
        <h2>Ecco i tuoi risultati per [{pokemonData.name}]</h2>
        <div className="row center mb">
          <div className="column">
            <p>Nome: {pokemonData.name}</p>
          </div>
          <div className="column">
            <p>Peso: {pokemonData.weight}</p>
          </div>
          <div className="column">
            <p>Altezza: {pokemonData.height}</p>
          </div>
        </div>

        <div className="row center">
          <div className="column">
            <img alt="pokemon" className="pokemon-sprite" src={pokemonData.sprites[spriteType]}></img>
          </div>

          <div className="column">
            <div>
              <button onClick={() => setSpriteType(spriteEnum.front_default)} className="button-outline button-width">DEFAULT</button>
            </div>
            <div>
              <button onClick={() => setSpriteType(spriteEnum.front_shiny)} className="button-outline button-width">SHINY</button>
            </div>
          </div>

          <div className="column">
            <h4>Statistiche</h4>
            {pokemonData.stats.map(stat => (
              <div key={stat.stat.name}>
                <label>{stat.stat.name}</label>
                <progress max={100} value={stat.base_stat}></progress>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
  else {
    content = null
  }
  


  return (
    <div className="container">
      {content}
    </div>
  )
}

export default Statistics