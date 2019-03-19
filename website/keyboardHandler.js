// Note : Les inputs devront être envoyé et traité par le back, 2 choix, tout envoyé et laisser le back traité ou pré-filtrer côté front (dans tout les cas une vérif côté back aura lieu)
document.addEventListener('keyup', (event) => {
	const validKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  	const keyName = event.key;
	if(validKey.includes(keyName)){
		socket.emit('input', keyName);
	}
});