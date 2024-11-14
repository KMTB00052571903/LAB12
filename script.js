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
                <div id="edit-nombre-${index}" style="display: none;">
                    <input type="text" placeholder="Nuevo Nombre" value="${contact.nombre}">
                </div>
                
                <p><strong>Teléfono:</strong> ${contact.telefono}</p>
                <div id="edit-telefono-${index}" style="display: none;">
                    <input type="tel" placeholder="Nuevo Teléfono" value="${contact.telefono}">
                </div>
                
                <p><strong>Email:</strong> ${contact.email}</p>
                <div id="edit-email-${index}" style="display: none;">
                    <input type="email" placeholder="Nuevo Email" value="${contact.email}">
                </div>
                
                <p><strong>Dirección:</strong> ${contact.direccion}</p>
                <div id="edit-direccion-${index}" style="display: none;">
                    <input type="text" placeholder="Nueva Dirección" value="${contact.direccion}">
                </div>
                
                <button onclick="toggleEdit(${index})">Editar</button>
                <button onclick="deleteContact(${index})">Eliminar</button>
                <button onclick="saveEdit(${index})" style="display: none;" id="save-${index}">Guardar</button>
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

    // Validar y agregar contacto
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        const direccion = document.getElementById('direccion').value.trim();

        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            alert("El nombre solo debe contener letras.");
            return;
        }
        if (!/^\d+$/.test(telefono)) {
            alert("El teléfono solo debe contener números.");
            return;
        }

        saveContact({ nombre, telefono, email, direccion });
        contactForm.reset();
    });

    // Mostrar/ocultar formulario de edición
    window.toggleEdit = (index) => {
        document.getElementById(`edit-nombre-${index}`).style.display = 'block';
        document.getElementById(`edit-telefono-${index}`).style.display = 'block';
        document.getElementById(`edit-email-${index}`).style.display = 'block';
        document.getElementById(`edit-direccion-${index}`).style.display = 'block';
        document.getElementById(`save-${index}`).style.display = 'inline-block';
    };

    // Guardar cambios de edición
    window.saveEdit = (index) => {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        const nombre = document.querySelector(`#edit-nombre-${index} input`).value.trim();
        const telefono = document.querySelector(`#edit-telefono-${index} input`).value.trim();
        const email = document.querySelector(`#edit-email-${index} input`).value.trim();
        const direccion = document.querySelector(`#edit-direccion-${index} input`).value.trim();

        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            alert("El nombre solo debe contener letras.");
            return;
        }
        if (!/^\d+$/.test(telefono)) {
            alert("El teléfono solo debe contener números.");
            return;
        }

        contacts[index] = { nombre, telefono, email, direccion };
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

    loadContacts();
});
