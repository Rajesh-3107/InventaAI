import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
en: {
translation: {
title: "Inventa AI",
placeholder: "Enter product name...",
generate: "Generate Catalogue",
generating: "Generating...",
error: "Error generating description.",
selectType: "Select Product Type",
farmer: "Farmer",
artisan: "Artisan",
kirana: "Kirana Store Owner",
},
},
hi: {
translation: {
title: "इनवेंटा एआई",
placeholder: "उत्पाद का नाम दर्ज करें...",
generate: "कैटलॉग जनरेट करें",
generating: "जनरेट हो रहा है...",
error: "विवरण जनरेट करने में त्रुटि।",
selectType: "उत्पाद प्रकार चुनें",
farmer: "किसान",
artisan: "कारीगर",
kirana: "किराना दुकानदार",
},
},
ta: {
translation: {
title: "இன்வென்டா ஏஐ",
placeholder: "பொருளின் பெயரை உள்ளிடவும்...",
generate: "கட்டளையை உருவாக்கு",
generating: "உருவாக்கப்படுகிறது...",
error: "விளக்கம் உருவாக்கும் போது பிழை.",
selectType: "பொருள் வகையைத் தேர்ந்தெடுக்கவும்",
farmer: "விவசாயி",
artisan: "கலைஞர்",
kirana: "கிரானா கடை உரிமையாளர்",
},
},
te: {
translation: {
title: "ఇన్వెంటా ఏఐ",
placeholder: "ఉత్పత్తి పేరు నమోదు చేయండి...",
generate: "కాటలాగ్ సృష్టించు",
generating: "సృష్టించబడుతోంది...",
error: "వివరణ సృష్టించడంలో లోపం.",
selectType: "ఉత్పత్తి రకాన్ని ఎంచుకోండి",
farmer: "రైతు",
artisan: "శిల్పి",
kirana: "కిరాణా దుకాణం యజమాని",
},
},
};

i18n.use(initReactI18next).init({
resources,
lng: "en",
fallbackLng: "en",
interpolation: {
escapeValue: false,
},
});

export default i18n;