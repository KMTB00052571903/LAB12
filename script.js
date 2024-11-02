        document.addEventListener('DOMContentLoaded', () => {
            const contactForm = document.getElementById('contact-form');
            const contactList = document.getElementById('contact-list');
        
            // Cargar contactos desde localStorage
            const loadContacts = () => {
                const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
                contactList.innerHTML = '';
                contacts.forEach((contact, index) => {
                    const contactCard = document.createElement('div');
                    contactCard.className = 'contact-card';
                    contactCard.innerHTML = `
                        <p><strong>Nombre:</strong> ${contact.nombre}</p>
                        <p><strong>Teléfono:</strong> ${contact.telefono}</p>
                        <p><strong>Email:</strong> ${contact.email}</p>
                        <p><strong>Dirección:</strong> ${contact.direccion}</p>
                        <button onclick="editContact(${index})">Editar</button>
                        <button onclick="deleteContact(${index})">Eliminar</button>
                    `;
                    contactList.appendChild(contactCard);
                });
            };
        
            // Guardar contacto en localStorage
            const saveContact = (contact) => {
                const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
                contacts.push(contact);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                loadContacts();
            };
        
            // Editar contacto
            window.editContact = (index) => {
                const contacts = JSON.parse(localStorage.getItem('contacts'));
                const contact = contacts[index];
                document.getElementById('nombre').value = contact.nombre;
                document.getElementById('telefono').value = contact.telefono;
                document.getElementById('email').value = contact.email;
                document.getElementById('direccion').value = contact.direccion;
                contacts.splice(index, 1);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                loadContacts();
            };
        
            // Eliminar contacto
            window.deleteContact = (index) => {
                const contacts = JSON.parse(localStorage.getItem('contacts'));
                contacts.splice(index, 1);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                loadContacts();
            };
        
            // Manejar el envío del formulario
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const contact = {
                    nombre: document.getElementById('nombre').value,
                    telefono: document.getElementById('telefono').value,
                    email: document.getElementById('email').value,
                    direccion: document.getElementById('direccion').value
                };
                saveContact(contact);
                contactForm.reset();
            });
        
            // Cargar contactos al iniciar
            loadContacts();
        });