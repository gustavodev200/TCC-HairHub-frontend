const cores = ["#FF5733", "#53A5FF", "#f1c40f", "#6CB66F", "#F05761"];

// Função para sortear uma cor aleatória do array
export function generateRandomColor() {
  const indiceAleatorio = Math.floor(Math.random() * cores.length);
  return cores[indiceAleatorio];
}
