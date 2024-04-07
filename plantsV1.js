const token = 'FWK3ey0HLoqRYHTfMAcUH--dMJ_UccNR8pA4AOwpMQ4';

async function getPlantInfoByFamilyCommonName(familyCommonName) {
    try {
        // Vérifier String (required)
        if (typeof familyCommonName !== 'string' || familyCommonName.trim() === '') {
            throw new Error('Vous devez saisir quelque chose !!');
        }

        const response = await fetch(`https://trefle.io/api/v1/plants?token=${token}&filter[family_common_name]=${familyCommonName}`);
        
        // Vérifier le statut de la réponse
        if (!response.ok) {
            const errorJson = await response.json();
            throw new Error(errorJson.messages || 'Erreur inconnue lors de la communication avec l\'API Trefle.');
        }

        // Si statut Ok récupérer la réponse, vu que le corps de la réponse de Trèfle APi est du Json la méthode.json la transfomera en ObjetJS
        const responseData = await response.json();
        // console.log(responseData);

        // Vérifier si l'objet à une propriété data et qu'elle n'est pas nulle , ****possiblité d'utiliser map() sur le tableau existant pour créer un nouveau tableau
        if (responseData.data && responseData.data.length > 0) {
            const plantsData = [];
            for (const plant of responseData.data) {
                  
                // Récupérer des informations supplémentaires sur le genus et les species avec appel des fonctions spécifiques sur les API
                const genusInfo = await getGenusInfo(plant.genus_id);
                const speciesInfo = await getSpeciesInfo(plant.id); 
                
                // Implémenter dans notre tableau les nouveaux champs avec leurs valeurs
                plantsData.push({
                    scientific_name: plant.scientific_name,
                    year: plant.year,
                    genus_family_common_name: genusInfo.data.family.common_name,
                    species_observation: speciesInfo.data.observations, 
                });
            }
            return plantsData;
        } else {
            throw new Error('Aucune plante trouvée avec le nom de famille commun spécifié.');
        }
    } catch (error) {
        throw error;
    }
}



async function getGenusInfo(id) {
    try {
        const response = await fetch(`https://trefle.io/api/v1/genus/${id}?token=${token}`);
        
        if (!response.ok) {
            const errorJson = await response.json();
            throw new Error(errorJson.messages || 'Error fetching Genus information from Trefle API.');
        }

        const genusData = await response.json();
        return genusData;
    } catch (error) {
        throw error;
    }
}

async function getSpeciesInfo(id) {
    try {
        const response = await fetch(`https://trefle.io/api/v1/species/${id}?token=${token}`);
        
        if (!response.ok) {
            const errorJson = await response.json();
            throw new Error(errorJson.messages || 'Error fetching Species information from Trefle API.');
        }

        const speciesData = await response.json();
        
        return speciesData;
    } catch (error) {
        throw error;
    }
}

module.exports = { getPlantInfoByFamilyCommonName };








