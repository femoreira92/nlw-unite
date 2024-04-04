let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 22)
  },
  {
    nome: "Maria Silva",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 12, 30),
    dataCheckIn: new Date(2024, 1, 18, 15, 45)
  },
  {
    nome: "João Souza",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 10, 0),
    dataCheckIn: new Date(2024, 1, 12, 11, 30)
  },
  {
    nome: "Ana Oliveira",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 8, 15),
    dataCheckIn: new Date(2024, 0, 7, 9, 45)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 3, 14, 10),
    dataCheckIn: new Date(2024, 3, 5, 16, 30)
  },
  {
    nome: "Juliana Lima",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 3, 10, 17, 50),
    dataCheckIn: new Date(2024, 3, 13, 19, 40)
  },
  {
    nome: "Lucas Mendes",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 4, 12, 20, 5),
    dataCheckIn: new Date(2024, 4, 15, 22, 30)
  },
  {
    nome: "Carla Rodrigues",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 5, 18, 9, 40),
    dataCheckIn: new Date(2024, 5, 20, 11, 15)
  },
  {
    nome: "Gustavo Almeida",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 6, 25, 16, 13),
    dataCheckIn: new Date(2024, 6, 27, 18, 20)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button data-email="${participante.email}" onclick="fazerCheckIn(event)" > 
      Confirmar check-in 
      </button>
    `
  }

  return `
   <tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>
        ${dataInscricao}
      </td>
      <td>
        ${dataCheckIn}
      </td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(''),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email

  )

  if (participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)


  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  const resultado = confirm('Tem certeza que deseja fazer o check-in?')
  if (confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) => 
    p.email == event.target.dataset.email

  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)


}