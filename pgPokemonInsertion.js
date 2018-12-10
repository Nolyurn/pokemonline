const pg = require('pg');

const pokemonData = require('./pokemons.json');

const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'pokemonline',
password: 'moonshield',
port: '5432',
max: 50});

for(pokemon of pokemonData.pokemons) {
	console.log(pokemon.baseName)
	let baseName = pokemon.baseName;
	let pokedexIndex = pokemon.pokedexIndex;
	let hp = pokemon.stats.hp;
	let attack = pokemon.stats.attack;
	let defense = pokemon.stats.defense;
	let specialAttack = pokemon.stats.specialAttack;
	let specialDefense = pokemon.stats.specialDefense;
	let speed = pokemon.stats.speed;
	let firstType = pokemon.firstType;
	let secondType = pokemon.secondType;
	let catchRate = pokemon.catchRate;
	let request = `INSERT INTO pokemongame.base_pokemon (base_name, pokedex_index, hp, attack, defense, special_attack, special_defense, speed, first_type, second_type, catch_rate) VALUES ('${baseName}', '${pokedexIndex}', ${hp}, ${attack}, ${defense}, ${specialAttack}, ${specialDefense}, ${speed},'${firstType}', '${secondType}', ${catchRate});`;

	pool.query(request, (err, res) => {
		console.log(err, res);
	});	
}
pool.end();
