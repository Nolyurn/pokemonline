// Note : Les inputs devront être envoyé et traité par le back, 2 choix, tout envoyé et laisser le back traité ou pré-filtrer côté front (dans tout les cas une vérif côté back aura lieu)
document.addEventListener('keyup', (event) => {
  	const keyName = event.key;
	if(keyName === 'ArrowUp'){
		socket.emit('input', keyName);
	}
	if(keyName === 'ArrowDown') {
		socket.emit('input', keyName);

	}
	if(keyName === 'ArrowLeft') {
		socket.emit('input', keyName);
	}
	if(keyName === 'ArrowRight') {
		socket.emit('input', keyName);
	}
	
  // alert('keydown event\n\n' + 'key: ' + keyName);
});