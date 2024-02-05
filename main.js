//* STRUTTUTA BASE VUE

const { createApp } = Vue;
var DateTime = luxon.DateTime;

const app = createApp({
  data() {
    return {
      contacts: [
        {
          name: "Michele",
          avatar: "./img/avatar_1.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "./img/avatar_2.jpg",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "./img/avatar_3.jpg",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "./img/avatar_4.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "./img/avatar_5.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "./img/avatar_6.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "./img/avatar_7.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "./img/avatar_8.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],

      activeChat: 0,

      contactFilter: "",

      newMessage: {
        date: this.currentTime(),
        message: "",
        status: "sent",
      },
    };
  },

  computed: {
    activeContact() {
      return this.contacts[this.activeChat];
    },
  },

  methods: {
    clickChat(index) {
      this.activeChat = index;
    },

    sendMessage() {
      // controllo se c'è del testo, se non c'è interrompo la funzione
      if (!this.newMessage.message) return;

      // copio staticamente l'oggetto nuovo messaggio
      const nuovoMessaggio = { ...this.newMessage };

      // prendo il tempo corrente e lo aggiorno nel messaggio
      nuovoMessaggio.date = this.currentTime();

      // aggiungo il messaggio alla conversazione con l'utente attivo
      this.contacts[this.activeChat].messages.push(nuovoMessaggio);

      //resetto l'input
      this.newMessage.message = "";

      // invio risposta automatica dopo 1 secondo
      setTimeout(this.automaticMessage, 1000);
    },

    currentTime() {
      const now = new Date();

      const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();

      const month =
        now.getMonth() + 1 < 10
          ? "0" + (now.getMonth() + 1)
          : now.getMonth() + 1;

      const years =
        now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear();

      const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();

      const minutes =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();

      const seconds =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

      console.log(`${day}/${month}/${years} ${hours}:${minutes}:${seconds}`);

      return `${day}/${month}/${years} ${hours}:${minutes}:${seconds}`;
    },

    automaticMessage() {
      const messaggioAutomatico = {
        status: "received",
        message: "sto a keppà",
        date: this.currentTime(),
      };

      this.contacts[this.activeChat].messages.push(messaggioAutomatico);
    },

    formatDate(date) {
      const messageDate = DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss");

      const messageDateText = messageDate.toLocaleString({
        hour: "numeric",
        minute: "numeric",
        //timeZoneName: "short",
      });

      return messageDateText;
    },

    namesfilter() {
      console.log(this.contactFilter);
      this.contactFilter;

      this.contacts = this.contacts.map((contact) => {
        if (
          contact.name.toLowerCase().includes(this.contactFilter.toLowerCase())
        ) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }

        return contact;
      });
    },
  },
});

app.mount("#root");
