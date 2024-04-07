const { getPlantInfoByFamilyCommonName } = require('./plantsV1.js'); 
const express = require('express'); 
const app = express();
const port = 8000;



app.get('/api/fr', async (request, response) => {
    try {
        // Décodage du paramètre de requête 
        const familyCommonName = decodeURIComponent(request.query.family_common_name);
        // Appel de la fonction 
        const plantInfo = await getPlantInfoByFamilyCommonName(familyCommonName);
        // Renvoi des informations sur les plantes en tant que réponse JSON
        response.json(plantInfo);
    } catch (error) {
        response.status(401).json({ error: error.message });
    }
});



app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});









/*  TEST afin d'implémenter un formulaire pour la saisie des paramètres

app.use(express.urlencoded({ extended: true }));

let errorMessage = '';

app.get('/fr', (req, res) => {
    let errorHtml = errorMessage ? `<p style="color: red;">${errorMessage}</p>` : '';
    res.send(`
        <form action="/fr" method="post">
            <label for="familyName">Nom de la famille de la plante :</label>
            <input type="text" id="familyName" name="familyName">
            <button type="submit">Rechercher</button>
            ${errorHtml}
        </form>
    `);
});

app.post('/fr', async (req, res) => {
    errorMessage = '';
    try {
        const familyName = req.body.familyName;
        if (!familyName) {
            throw new Error('Veuillez saisir un nom de famille de plante.');
        }
        const plantInfo = await getPlantInfoByFamilyCommonName(familyName);
        let errorHtml = errorMessage ? `<p style="color: red;">${errorMessage}</p>` : '';
        let formHtml = `
            <form action="/fr" method="post">
                <label for="familyName">Nom de la famille de la plante :</label>
                <input type="text" id="familyName" name="familyName" value="">
                <button type="submit">Rechercher</button>
                ${errorHtml}
            </form>
        `;

        // Générer les informations sur les plantes
        let plantInfoHtml = `
            <p style="color: green;">Informations sur les plantes de la famille : <strong>${familyName}</strong></p>
            <pre>${JSON.stringify(plantInfo, null, 2)}</pre>
        `;

        // Envoyer à la fois le formulaire et les informations sur les plantes
        res.send(formHtml + plantInfoHtml);
        

    } catch (error) {
        const inputFamilyName = req.body.familyName ? `<strong>${req.body.familyName}</strong>` : 'Aucun';
        errorMessage = `${error.message} <br><br>Nom de famille de la plante que vous avez saisi : ${inputFamilyName}`;
        res.redirect(`/fr`);
    }
});

*/






