// --- TYPE DEFINITIONS ---
export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type SubjectQuestionsData = Record<string, QuizQuestion[]>;
export type MasterQuestionData = Record<string, Record<string, SubjectQuestionsData>>;

// --- MATH QUESTIONS ---
const mathEnglishQuestions: SubjectQuestionsData = {
  '6': [
    { question: '2 + 3 = ?', options: ['4','5','6','7'], answer: '5' },
    { question: '5 × 6 = ?', options: ['11','30','25','35'], answer: '30' },
    { question: 'Half of 18?', options: ['7','8','9','10'], answer: '9' },
    { question: '10 - 4 = ?', options: ['4','5','6','7'], answer: '6' },
  ],
  '7': [
    { question: '12 ÷ 4 = ?', options: ['2','3','4','6'], answer: '3' },
    { question: '7 × 8 = ?', options: ['54','56','48','49'], answer: '56' },
    { question: 'Simplify: 15 + 27', options: ['42','41','43','40'], answer: '42' },
    { question: 'Subtract: 50 - 23', options: ['27','26','28','25'], answer: '27' },
  ],
  '8': [
    { question: '√64 = ?', options: ['6','8','7','9'], answer: '8' },
    { question: '20% of 50?', options: ['10','12','15','20'], answer: '10' },
    { question: 'Simplify: 3² × 2', options: ['18','12','15','16'], answer: '18' },
    { question: '15 + 27 = ?', options: ['42','41','43','40'], answer: '42' },
  ],
  '9': [
    { question: 'Simplify: 2(3x + 4) = ?', options: ['6x + 4','6x + 8','5x + 8','6x + 6'], answer: '6x + 8' },
    { question: 'Factorize: x² + 5x + 6', options: ['(x+2)(x+3)','(x+1)(x+6)','(x+3)(x+2)','(x+2)(x+2)'], answer: '(x+2)(x+3)' },
    { question: 'Value of 7² - 12', options: ['37','49','47','45'], answer: '37' },
    { question: 'Simplify: 15 ÷ 3 × 2', options: ['8','10','12','6'], answer: '10' },
  ],
  '10': [
    { question: 'Solve: 12 × 8', options: ['96','108','86','100'], answer: '96' },
    { question: 'Square root of 144?', options: ['10','12','14','16'], answer: '12' },
    { question: 'Percentage of 80 in 200?', options: ['40%','50%','60%','30%'], answer: '40%' },
    { question: 'Solve: 5x = 25', options: ['4','5','6','10'], answer: '5' },
  ],
  '11': [
    { question: 'Solve for x: 2x + 5 = 15', options: ['5','10','2','7'], answer: '5' },
    { question: 'Derivative of x²?', options: ['x','2x','x²','2'], answer: '2x' },
    { question: 'Integral of 3x dx?', options: ['1.5x² + C','3x² + C','3x + C','x² + C'], answer: '1.5x² + C' },
    { question: 'Simplify: (x+2)(x+3)', options: ['x²+5x+6','x²+6x+5','x²+4x+6','x²+5x+5'], answer: 'x²+5x+6' },
  ],
  '12': [
    { question: 'Integral of 2x dx?', options: ['x²','x² + C','2x²','x + C'], answer: 'x² + C' },
    { question: 'Limit of (1/x) as x→∞?', options: ['0','1','∞','Does not exist'], answer: '0' },
    { question: 'Derivative of sin(x)?', options: ['cos(x)','sin(x)','-cos(x)','-sin(x)'], answer: 'cos(x)' },
    { question: 'Solve: x² - 4 = 0', options: ['x=2','x=-2','x=±2','x=0'], answer: 'x=±2' },
  ],
};

// --- MATH Hindi ---
const mathHindiQuestions: SubjectQuestionsData = {
  '6': [
    { question: '2 + 3 = ?', options: ['4','5','6','7'], answer: '5' },
    { question: '5 × 6 = ?', options: ['11','30','25','35'], answer: '30' },
    { question: '18 का आधा कितना है?', options: ['7','8','9','10'], answer: '9' },
    { question: '10 - 4 = ?', options: ['4','5','6','7'], answer: '6' },
  ],
  '7': [
    { question: '12 ÷ 4 = ?', options: ['2','3','4','6'], answer: '3' },
    { question: '7 × 8 = ?', options: ['54','56','48','49'], answer: '56' },
    { question: 'सरलीकरण: 15 + 27', options: ['42','41','43','40'], answer: '42' },
    { question: 'घटाएँ: 50 - 23', options: ['27','26','28','25'], answer: '27' },
  ],
  '8': [
    { question: '√64 = ?', options: ['6','8','7','9'], answer: '8' },
    { question: '50 का 20%?', options: ['10','12','15','20'], answer: '10' },
    { question: 'सरलीकरण: 3² × 2', options: ['18','12','15','16'], answer: '18' },
    { question: '15 + 27 = ?', options: ['42','41','43','40'], answer: '42' },
  ],
  '9': [
    { question: 'सरलीकरण: 2(3x + 4) = ?', options: ['6x + 4','6x + 8','5x + 8','6x + 6'], answer: '6x + 8' },
    { question: 'गुणनखंड: x² + 5x + 6', options: ['(x+2)(x+3)','(x+1)(x+6)','(x+3)(x+2)','(x+2)(x+2)'], answer: '(x+2)(x+3)' },
    { question: '7² - 12 = ?', options: ['37','49','47','45'], answer: '37' },
    { question: 'सरलीकरण: 15 ÷ 3 × 2', options: ['8','10','12','6'], answer: '10' },
  ],
  '10': [
    { question: '12 × 8 = ?', options: ['96','108','86','100'], answer: '96' },
    { question: '144 का वर्गमूल?', options: ['10','12','14','16'], answer: '12' },
    { question: '200 में 80 का प्रतिशत?', options: ['40%','50%','60%','30%'], answer: '40%' },
    { question: '5x = 25 का हल?', options: ['4','5','6','10'], answer: '5' },
  ],
  '11': [
    { question: '2x + 5 = 15 का हल?', options: ['5','10','2','7'], answer: '5' },
    { question: 'x² का व्युत्पन्न?', options: ['x','2x','x²','2'], answer: '2x' },
    { question: '3x का समाकलन dx?', options: ['1.5x² + C','3x² + C','3x + C','x² + C'], answer: '1.5x² + C' },
    { question: 'सरलीकरण: (x+2)(x+3)', options: ['x²+5x+6','x²+6x+5','x²+4x+6','x²+5x+5'], answer: 'x²+5x+6' },
  ],
  '12': [
    { question: '2x का समाकलन dx?', options: ['x²','x² + C','2x²','x + C'], answer: 'x² + C' },
    { question: 'सीमा: (1/x) जब x→∞?', options: ['0','1','∞','अस्तित्व में नहीं'], answer: '0' },
    { question: 'sin(x) का व्युत्पन्न?', options: ['cos(x)','sin(x)','-cos(x)','-sin(x)'], answer: 'cos(x)' },
    { question: 'x² - 4 = 0 का हल?', options: ['x=2','x=-2','x=±2','x=0'], answer: 'x=±2' },
  ],
};
const mathOdiaQuestions: SubjectQuestionsData = {
  '6': [
    { question: '2 + 3 = ?', options: ['4','5','6','7'], answer: '5' },
    { question: '5 × 6 = ?', options: ['11','30','25','35'], answer: '30' },
    { question: '18ର ଅର୍ଧ କେତେ?', options: ['7','8','9','10'], answer: '9' },
    { question: '10 - 4 = ?', options: ['4','5','6','7'], answer: '6' },
  ],
  '7': [
    { question: '12 ÷ 4 = ?', options: ['2','3','4','6'], answer: '3' },
    { question: '7 × 8 = ?', options: ['54','56','48','49'], answer: '56' },
    { question: 'ସରଳୀକରଣ: 15 + 27', options: ['42','41','43','40'], answer: '42' },
    { question: 'ବିୟୋଗ: 50 - 23', options: ['27','26','28','25'], answer: '27' },
  ],
  '8': [
    { question: '√64 = ?', options: ['6','8','7','9'], answer: '8' },
    { question: '50 ର 20% କେତେ?', options: ['10','12','15','20'], answer: '10' },
    { question: 'ସରଳୀକରଣ: 3² × 2', options: ['18','12','15','16'], answer: '18' },
    { question: '15 + 27 = ?', options: ['42','41','43','40'], answer: '42' },
  ],
  '9': [
    { question: 'ସରଳୀକରଣ: 2(3x + 4) = ?', options: ['6x + 4','6x + 8','5x + 8','6x + 6'], answer: '6x + 8' },
    { question: 'ଗୁଣନଖଣ୍ଡ: x² + 5x + 6', options: ['(x+2)(x+3)','(x+1)(x+6)','(x+3)(x+2)','(x+2)(x+2)'], answer: '(x+2)(x+3)' },
    { question: '7² - 12 = ?', options: ['37','49','47','45'], answer: '37' },
    { question: 'ସରଳୀକରଣ: 15 ÷ 3 × 2', options: ['8','10','12','6'], answer: '10' },
  ],
  '10': [
    { question: '12 × 8 = ?', options: ['96','108','86','100'], answer: '96' },
    { question: '144 ର ବର୍ଗମୂଳ କେତେ?', options: ['10','12','14','16'], answer: '12' },
    { question: '200 ର 80 ର ପ୍ରତିଶତ କେତେ?', options: ['40%','50%','60%','30%'], answer: '40%' },
    { question: '5x = 25 ର ମୂଲ୍ୟ କଣ?', options: ['4','5','6','10'], answer: '5' },
  ],
  '11': [
    { question: '2x + 5 = 15 ର ମୂଲ୍ୟ କଣ?', options: ['5','10','2','7'], answer: '5' },
    { question: 'x² ର ଡେରିଭେଟିଭ୍ କଣ?', options: ['x','2x','x²','2'], answer: '2x' },
    { question: '3x ର ଇନ୍ଟେଗ୍ରାଲ୍ dx?', options: ['1.5x² + C','3x² + C','3x + C','x² + C'], answer: '1.5x² + C' },
    { question: 'ସରଳୀକରଣ: (x+2)(x+3)', options: ['x²+5x+6','x²+6x+5','x²+4x+6','x²+5x+5'], answer: 'x²+5x+6' },
  ],
  '12': [
    { question: '2x ର ଇନ୍ଟେଗ୍ରାଲ୍ dx?', options: ['x²','x² + C','2x²','x + C'], answer: 'x² + C' },
    { question: 'ସୀମା: (1/x) ଯେତେବେଳେ x→∞?', options: ['0','1','∞','ଅସ୍ତିତ୍ୱ ନାହିଁ'], answer: '0' },
    { question: 'sin(x) ର ଡେରିଭେଟିଭ୍ କଣ?', options: ['cos(x)','sin(x)','-cos(x)','-sin(x)'], answer: 'cos(x)' },
    { question: 'x² - 4 = 0 ର ମୂଲ୍ୟ କଣ?', options: ['x=2','x=-2','x=±2','x=0'], answer: 'x=±2' },
  ],
};
// --- SCIENCE QUESTIONS ---
const scienceEnglishQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'What is needed for photosynthesis?', options: ['Sunlight','Salt','Sugar','Sand'], answer: 'Sunlight' },
    { question: 'At what temperature (°C) does water boil?', options: ['100','90','80','70'], answer: '100' },
    { question: 'Which organ pumps blood?', options: ['Heart','Liver','Lungs','Brain'], answer: 'Heart' },
    { question: 'Which of the following is in a solid state?', options: ['Ice','Water','Steam','Oxygen'], answer: 'Ice' },
  ],
  '7': [
    { question: 'What is H₂O?', options: ['Water','Oxygen','Hydrogen','Salt'], answer: 'Water' },
    { question: 'Which planet is called the Red Planet?', options: ['Mars','Venus','Jupiter','Saturn'], answer: 'Mars' },
    { question: 'What gas do plants absorb?', options: ['CO₂','O₂','N₂','H₂'], answer: 'CO₂' },
    { question: 'What is the SI unit of electric current?', options: ['Ampere','Volt','Ohm','Watt'], answer: 'Ampere' },
  ],
  '8': [
    { question: 'Chemical symbol for Sodium?', options: ['Na','So','S','N'], answer: 'Na' },
    { question: 'Powerhouse of the cell?', options: ['Mitochondria','Nucleus','Ribosome','Chloroplast'], answer: 'Mitochondria' },
    { question: 'Newton’s Third Law relates to what?', options: ['Action-reaction','Gravity','Inertia','Friction'], answer: 'Action-reaction' },
    { question: 'Main gas in air?', options: ['Nitrogen','Oxygen','CO₂','Hydrogen'], answer: 'Nitrogen' },
  ],
  '9': [
    { question: 'Chemical formula for Glucose?', options: ['C₆H₁₂O₆','CO₂','H₂O','NaCl'], answer: 'C₆H₁₂O₆' },
    { question: 'Unit to measure force?', options: ['Newton','Joule','Watt','Pascal'], answer: 'Newton' },
    { question: 'Maximum electrons in K-shell?', options: ['2','8','18','32'], answer: '2' },
    { question: 'Velocity of sound is maximum in?', options: ['Solid','Liquid','Gas','Vacuum'], answer: 'Solid' },
  ],
  '10': [
    { question: 'pH of pure water?', options: ['7','1','14','0'], answer: '7' },
    { question: 'Who gave the Theory of Relativity?', options: ['Einstein','Newton','Darwin','Curie'], answer: 'Einstein' },
    { question: 'Chemical symbol for Iron?', options: ['Fe','Ir','In','I'], answer: 'Fe' },
    { question: 'Part of eye controlling light?', options: ['Iris','Lens','Retina','Cornea'], answer: 'Iris' },
  ],
  '11': [
    { question: 'Avogadro’s number?', options: ['6.022×10²³','3.14','9.8','1.6×10⁻¹⁹'], answer: '6.022×10²³' },
    { question: 'Speed of light?', options: ['3×10⁸ m/s','1.5×10⁸ m/s','3×10⁶ m/s','1.5×10⁶ m/s'], answer: '3×10⁸ m/s' },
    { question: 'Vitamin produced by sunlight?', options: ['Vitamin D','Vitamin C','Vitamin A','Vitamin B'], answer: 'Vitamin D' },
    { question: 'Atomic number of Carbon?', options: ['6','12','8','14'], answer: '6' },
  ],
  '12': [
    { question: 'Universal Gas Constant (R)?', options: ['8.314 J/mol·K','9.8 m/s²','6.022×10²³','1.6×10⁻¹⁹ C'], answer: '8.314 J/mol·K' },
    { question: 'Function of White Blood Cells?', options: ['Fight infection','Carry oxygen','Clot blood','Store fat'], answer: 'Fight infection' },
    { question: 'First law of Thermodynamics?', options: ['Energy is conserved','F=ma','E=mc²','PV=nRT'], answer: 'Energy is conserved' },
    { question: 'Chemical symbol for Gold?', options: ['Au','Ag','Gd','Go'], answer: 'Au' },
  ],
};
// --- SCIENCE Hindi QUESTIONS ---
const scienceHindiQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'प्रकाश संश्लेषण के लिए क्या आवश्यक है?', options: ['सूर्य का प्रकाश','नमक','चीनी','रेत'], answer: 'सूर्य का प्रकाश' },
    { question: 'पानी किस तापमान (°C) पर उबलता है?', options: ['100','90','80','70'], answer: '100' },
    { question: 'कौन सा अंग रक्त पंप करता है?', options: ['हृदय','यकृत','फेफड़े','मस्तिष्क'], answer: 'हृदय' },
    { question: 'इनमें से कौन सी वस्तु ठोस अवस्था में है?', options: ['बर्फ','पानी','भाप','ऑक्सीजन'], answer: 'बर्फ' },
  ],
  '7': [
    { question: 'H₂O क्या है?', options: ['पानी','ऑक्सीजन','हाइड्रोजन','नमक'], answer: 'पानी' },
    { question: 'कौन सा ग्रह लाल ग्रह कहलाता है?', options: ['मंगल','शुक्र','बृहस्पति','शनि'], answer: 'मंगल' },
    { question: 'पौधे कौन सी गैस अवशोषित करते हैं?', options: ['CO₂','O₂','N₂','H₂'], answer: 'CO₂' },
    { question: 'विद्युत धारा का SI मात्रक क्या है?', options: ['एम्पीयर','वोल्ट','ओम','वाट'], answer: 'एम्पीयर' },
  ],
  '8': [
    { question: 'सोडियम का रासायनिक प्रतीक क्या है?', options: ['Na','So','S','N'], answer: 'Na' },
    { question: 'कोशिका का पावरहाउस क्या है?', options: ['माइटोकॉन्ड्रिया','नाभिक','राइबोसोम','क्लोरोप्लास्ट'], answer: 'माइटोकॉन्ड्रिया' },
    { question: 'न्यूटन का तीसरा नियम किससे संबंधित है?', options: ['क्रिया-प्रतिक्रिया','गुरुत्वाकर्षण','जड़ता','घर्षण'], answer: 'क्रिया-प्रतिक्रिया' },
    { question: 'हवा में मुख्य गैस कौन सी है?', options: ['नाइट्रोजन','ऑक्सीजन','CO₂','हाइड्रोजन'], answer: 'नाइट्रोजन' },
  ],
  '9': [
    { question: 'ग्लूकोज का रासायनिक सूत्र क्या है?', options: ['C₆H₁₂O₆','CO₂','H₂O','NaCl'], answer: 'C₆H₁₂O₆' },
    { question: 'बल मापने की इकाई कौन सी है?', options: ['न्यूटन','जूल','वाट','पास्कल'], answer: 'न्यूटन' },
    { question: 'K-शेल में अधिकतम कितने इलेक्ट्रॉन्स हो सकते हैं?', options: ['2','8','18','32'], answer: '2' },
    { question: 'ध्वनि का वेग किस माध्यम में अधिकतम होता है?', options: ['ठोस','तरल','गैस','निर्वात'], answer: 'ठोस' },
  ],
  '10': [
    { question: 'शुद्ध पानी का pH क्या है?', options: ['7','1','14','0'], answer: '7' },
    { question: 'सापेक्षता का सिद्धांत किसने दिया?', options: ['आइंस्टीन','न्यूटन','डार्विन','क्यूरी'], answer: 'आइंस्टीन' },
    { question: 'लोहा का रासायनिक प्रतीक क्या है?', options: ['Fe','Ir','In','I'], answer: 'Fe' },
    { question: 'आँख का कौन सा हिस्सा प्रकाश को नियंत्रित करता है?', options: ['परितारिका','लेंस','रेटिना','कॉर्निया'], answer: 'परितारिका' },
  ],
  '11': [
    { question: 'एवोगैड्रो संख्या क्या है?', options: ['6.022×10²³','3.14','9.8','1.6×10⁻¹⁹'], answer: '6.022×10²³' },
    { question: 'प्रकाश की गति कितनी है?', options: ['3×10⁸ m/s','1.5×10⁸ m/s','3×10⁶ m/s','1.5×10⁶ m/s'], answer: '3×10⁸ m/s' },
    { question: 'सूरज की रोशनी से कौन सा विटामिन उत्पन्न होता है?', options: ['विटामिन D','विटामिन C','विटामिन A','विटामिन B'], answer: 'विटामिन D' },
    { question: 'कार्बन का परमाणु क्रमांक क्या है?', options: ['6','12','8','14'], answer: '6' },
  ],
  '12': [
    { question: 'सार्वभौमिक गैस स्थिरांक (R) क्या है?', options: ['8.314 J/mol·K','9.8 m/s²','6.022×10²³','1.6×10⁻¹⁹ C'], answer: '8.314 J/mol·K' },
    { question: 'श्वेत रक्त कोशिकाओं का मुख्य कार्य क्या है?', options: ['संक्रमण से लड़ना','ऑक्सीजन ले जाना','रक्त जमाना','वसा जमा करना'], answer: 'संक्रमण से लड़ना' },
    { question: 'ऊष्मप्रवैगिकी का पहला नियम क्या है?', options: ['ऊर्जा संरक्षित रहती है','F=ma','E=mc²','PV=nRT'], answer: 'ऊर्जा संरक्षित रहती है' },
    { question: 'सोने का रासायनिक प्रतीक क्या है?', options: ['Au','Ag','Gd','Go'], answer: 'Au' },
  ],
};

// --- SCIENCE Odia QUESTIONS ---
const scienceOdiaQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'ପ୍ରକାଶ ସଂଶ୍ଳେଷଣ ପାଇଁ କ’ଣ ଆବଶ୍ୟକ?', options: ['ସୂର୍ଯ୍ୟାଲୋକ','ଲୁଣ','ଚିନି','ବାଳି'], answer: 'ସୂର୍ଯ୍ୟାଲୋକ' },
    { question: 'ପାଣି କେଉଁ ତାପମାନରେ (°C) ଉବାଉଛି?', options: ['100','90','80','70'], answer: '100' },
    { question: 'କେଉଁ ଅଙ୍ଗ ରକ୍ତ ପମ୍ପ କରେ?', options: ['ହୃଦୟ','ଯକୃତ','ଶ୍ୱାସକୋଷ','ମସ୍ତିଷ୍କ'], answer: 'ହୃଦୟ' },
    { question: 'ନିମ୍ନରୁ କେଉଁଟି ଠୋସ ଅବସ୍ଥାରେ ଅଛି?', options: ['ବରଫ','ପାଣି','ବାଷ୍ପ','ଅକ୍ସିଜେନ'], answer: 'ବରଫ' },
  ],
  '7': [
    { question: 'H₂O କ’ଣ?', options: ['ପାଣି','ଅକ୍ସିଜେନ','ହାଇଡ୍ରୋଜେନ','ଲୁଣ'], answer: 'ପାଣି' },
    { question: 'କେଉଁ ଗ୍ରହକୁ ଲାଲ୍ ଗ୍ରହ କୁହାଯାଏ?', options: ['ମଙ୍ଗଳ','ଶୁକ୍ର','ବୃହସ୍ପତି','ଶନି'], answer: 'ମଙ୍ଗଳ' },
    { question: 'ଗଛ କ’ଣ ଗ୍ୟାସ ଅବଶୋଷଣ କରେ?', options: ['CO₂','O₂','N₂','H₂'], answer: 'CO₂' },
    { question: 'ବିଦ୍ୟୁତ ଧାରାର SI ଏକକ କ’ଣ?', options: ['ଏମ୍ପିଅର୍','ଭୋଲ୍ଟ','ଓମ୍','ୱାଟ୍'], answer: 'ଏମ୍ପିଅର୍' },
  ],
  '8': [
    { question: 'ସୋଡିଅମର ରାସାୟନିକ ପ୍ରତୀକ କ’ଣ?', options: ['Na','So','S','N'], answer: 'Na' },
    { question: 'କୋଷର ପାୱାରହାଉସ୍ କ’ଣ?', options: ['ମାଇଟୋକଣ୍ଡ୍ରିଆ','ନ୍ୟୁକ୍ଲିଅସ୍','ରାଇବୋସୋମ୍','କ୍ଲୋରୋପ୍ଲାଷ୍ଟ'], answer: 'ମାଇଟୋକଣ୍ଡ୍ରିଆ' },
    { question: 'ନ୍ୟୁଟନଙ୍କ ତୃତୀୟ ନିୟମ କ’ଣ ସହ ସମ୍ବନ୍ଧିତ?', options: ['କ୍ରିୟା-ପ୍ରତିକ୍ରିୟା','ଗୁରୁତ୍ୱାକର୍ଷଣ','ଜଡତା','ଘର୍ଷଣ'], answer: 'କ୍ରିୟା-ପ୍ରତିକ୍ରିୟା' },
    { question: 'ବାୟୁରେ ପ୍ରଧାନ ଗ୍ୟାସ କ’ଣ?', options: ['ନାଇଟ୍ରୋଜେନ','ଅକ୍ସିଜେନ','CO₂','ହାଇଡ୍ରୋଜେନ'], answer: 'ନାଇଟ୍ରୋଜେନ' },
  ],
  '9': [
    { question: 'ଗ୍ଲୁକୋଜର ରାସାୟନିକ ସୂତ୍ର କ’ଣ?', options: ['C6H12O6','CO2','H2O','NaCl'], answer: 'C6H12O6' },
    { question: 'ବଳ ମାପିବା ପାଇଁ SI ଏକକ କ’ଣ?', options: ['ନ୍ୟୁଟନ','ଜୂଲ୍','ୱାଟ୍','ପାସ୍କାଲ୍'], answer: 'ନ୍ୟୁଟନ' },
    { question: 'K-ଶେଲରେ ସର୍ବାଧିକ ଇଲେକ୍ଟ୍ରୋନ କେତେ?', options: ['2','8','18','32'], answer: '2' },
    { question: 'ଧ୍ୱନିର ବେଗ କେଉଁ ମାଧ୍ୟମରେ ସର୍ବାଧିକ?', options: ['ଠୋସ','ତରଳ','ଗ୍ୟାସ','ଖାଳି'], answer: 'ଠୋସ' },
  ],
  '10': [
    { question: 'ଶୁଦ୍ଧ ପାଣିର pH କ’ଣ?', options: ['7','1','14','0'], answer: '7' },
    { question: 'ସାପେକ୍ଷତା ସିଦ୍ଧାନ୍ତ କିଏ ଦେଇଥିଲେ?', options: ['ଆଇନ୍‌ଷ୍ଟାଇନ୍','ନ୍ୟୁଟନ','ଡାର୍ୱିନ୍','କ୍ୟୁରି'], answer: 'ଆଇନ୍‌ଷ୍ଟାଇନ୍' },
    { question: 'ଲୋହାର ରାସାୟନିକ ପ୍ରତୀକ କ’ଣ?', options: ['Fe','Ir','In','I'], answer: 'Fe' },
    { question: 'ଆଖିର କେଉଁ ଅଂଶ ପ୍ରବେଶ କରୁଥିବା ପ୍ରକାଶକୁ ନିୟନ୍ତ୍ରଣ କରେ?', options: ['ପରିତାରିକା','ଲେନ୍ସ','ରେଟିନା','କର୍ଣ୍ଣିଆ'], answer: 'ପରିତାରିକା' },
  ],
  '11': [
    { question: 'ଏଭୋଗାଡ୍ରୋ ସଂଖ୍ୟା କ’ଣ?', options: ['6.022×10²³','3.14','9.8','1.6×10⁻¹⁹'], answer: '6.022×10²³' },
    { question: 'ପ୍ରକାଶର ଗତି କେତେ?', options: ['3×10⁸ m/s','1.5×10⁸ m/s','3×10⁶ m/s','1.5×10⁶ m/s'], answer: '3×10⁸ m/s' },
    { question: 'ସୂର୍ଯ୍ୟାଲୋକରେ କେଉଁ ଭିଟାମିନ୍ ଉତ୍ପାଦିତ ହୁଏ?', options: ['ଭିଟାମିନ୍ D','ଭିଟାମିନ୍ C','ଭିଟାମିନ୍ A','ଭିଟାମିନ୍ B'], answer: 'ଭିଟାମିନ୍ D' },
    { question: 'କାର୍ବନର ପରମାଣୁ ସଂଖ୍ୟା କେତେ?', options: ['6','12','8','14'], answer: '6' },
  ],
  '12': [
    { question: 'ସାର୍ବଜନୀନ ଗ୍ୟାସ ସ୍ଥିରାଙ୍କ (R) କ’ଣ?', options: ['8.314 J/mol·K','9.8 m/s²','6.022×10²³','1.6×10⁻¹⁹ C'], answer: '8.314 J/mol·K' },
    { question: 'ଶ୍ୱେତ ରକ୍ତ କୋଷର କାର୍ଯ୍ୟ କ’ଣ?', options: ['ସଂକ୍ରମଣରୁ ଯୁଦ୍ଧ','ଅକ୍ସିଜେନ ପରିବହନ','ରକ୍ତ ଗଠନ','ଚର୍ବି ସଂରକ୍ଷଣ'], answer: 'ସଂକ୍ରମଣରୁ ଯୁଦ୍ଧ' },
    { question: 'ଥର୍ମୋଡାଇନାମିକ୍ସର ପ୍ରଥମ ନିୟମ କ’ଣ?', options: ['ଶକ୍ତି ସଂରକ୍ଷିତ ରହେ','F=ma','E=mc²','PV=nRT'], answer: 'ଶକ୍ତି ସଂରକ୍ଷିତ ରହେ' },
    { question: 'ସୁନାର ରାସାୟନିକ ପ୍ରତୀକ କ’ଣ?', options: ['Au','Ag','Gd','Go'], answer: 'Au' },
  ],
};
// --- TECHNOLOGY English QUESTIONS ---
const technologyEnglishQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'Which device is used to point on a screen?', options: ['Mouse','Keyboard','Monitor','Printer'], answer: 'Mouse' },
    { question: 'What does CPU stand for?', options: ['Central Processing Unit','Computer Personal Unit','Central Peripheral Unit','Control Processing Unit'], answer: 'Central Processing Unit' },
    { question: 'Which device stores data permanently?', options: ['Hard Drive','RAM','Cache','Register'], answer: 'Hard Drive' },
    { question: 'Which of these is input device?', options: ['Keyboard','Monitor','Printer','Speaker'], answer: 'Keyboard' },
  ],
  '7': [
    { question: 'Which language is used to create web pages?', options: ['HTML','Python','C++','Java'], answer: 'HTML' },
    { question: 'What does RAM stand for?', options: ['Random Access Memory','Readily Available Memory','Rapid Access Memory','Read Access Memory'], answer: 'Random Access Memory' },
    { question: 'Which device prints documents?', options: ['Printer','Monitor','Keyboard','Mouse'], answer: 'Printer' },
    { question: 'Which part is considered brain of computer?', options: ['CPU','RAM','Monitor','Keyboard'], answer: 'CPU' },
  ],
  '8': [
    { question: 'Which network connects computers in a small area?', options: ['LAN','WAN','MAN','PAN'], answer: 'LAN' },
    { question: 'Which of these is output device?', options: ['Monitor','Keyboard','Mouse','Scanner'], answer: 'Monitor' },
    { question: 'HTML is used for?', options: ['Web pages','Programming apps','Database management','Networking'], answer: 'Web pages' },
    { question: 'What is software?', options: ['Programs','Hardware','Electricity','Monitor'], answer: 'Programs' },
  ],
  '9': [
    { question: 'Which is primary storage?', options: ['RAM','Hard Disk','CD','USB'], answer: 'RAM' },
    { question: 'Which network covers a large area?', options: ['WAN','LAN','MAN','PAN'], answer: 'WAN' },
    { question: 'CPU speed is measured in?', options: ['GHz','MB','Volts','Watts'], answer: 'GHz' },
    { question: 'Which is a programming language?', options: ['Python','HTML','CSS','SQL'], answer: 'Python' },
  ],
  '10': [
    { question: 'Which device converts digital to analog?', options: ['DAC','ADC','CPU','GPU'], answer: 'DAC' },
    { question: 'Which device converts analog to digital?', options: ['ADC','DAC','Monitor','Keyboard'], answer: 'ADC' },
    { question: 'GPU stands for?', options: ['Graphics Processing Unit','General Processing Unit','Graphical Program Unit','Global Processing Unit'], answer: 'Graphics Processing Unit' },
    { question: 'SSD is faster than?', options: ['HDD','RAM','CPU','Monitor'], answer: 'HDD' },
  ],
  '11': [
    { question: 'IoT stands for?', options: ['Internet of Things','Internet on Time','Information of Technology','Interface of Tools'], answer: 'Internet of Things' },
    { question: 'Which device is used to detect motion?', options: ['Sensor','Printer','Keyboard','Monitor'], answer: 'Sensor' },
    { question: 'Which is cloud storage?', options: ['Google Drive','HDD','RAM','CPU'], answer: 'Google Drive' },
    { question: 'Python is used for?', options: ['Programming','Networking','Hardware','Database'], answer: 'Programming' },
  ],
  '12': [
    { question: 'AI stands for?', options: ['Artificial Intelligence','Automated Input','Analog Interface','Advanced Integration'], answer: 'Artificial Intelligence' },
    { question: 'Which is example of wearable tech?', options: ['Smartwatch','Keyboard','Monitor','Printer'], answer: 'Smartwatch' },
    { question: 'HTTP is used in?', options: ['Web','Hardware','Programming','Networking'], answer: 'Web' },
    { question: 'Machine learning is part of?', options: ['AI','Networking','Software','Hardware'], answer: 'AI' },
  ],
};

// --- TECHNOLOGY Hindi QUESTIONS ---
const technologyHindiQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'स्क्रीन पर पॉइंट करने के लिए कौन सा डिवाइस उपयोग होता है?', options: ['माउस','कीबोर्ड','मॉनिटर','प्रिंटर'], answer: 'माउस' },
    { question: 'CPU का पूरा नाम क्या है?', options: ['Central Processing Unit','Computer Personal Unit','Central Peripheral Unit','Control Processing Unit'], answer: 'Central Processing Unit' },
    { question: 'कौन सा डिवाइस डेटा को स्थायी रूप से स्टोर करता है?', options: ['Hard Drive','RAM','Cache','Register'], answer: 'Hard Drive' },
    { question: 'इनमें से कौन सा इनपुट डिवाइस है?', options: ['कीबोर्ड','मॉनिटर','प्रिंटर','स्पीकर'], answer: 'कीबोर्ड' },
  ],
  '7': [
    { question: 'वेब पेज बनाने के लिए कौन सी भाषा प्रयोग होती है?', options: ['HTML','Python','C++','Java'], answer: 'HTML' },
    { question: 'RAM का पूरा नाम क्या है?', options: ['Random Access Memory','Readily Available Memory','Rapid Access Memory','Read Access Memory'], answer: 'Random Access Memory' },
    { question: 'कौन सा डिवाइस दस्तावेज़ प्रिंट करता है?', options: ['प्रिंटर','मॉनिटर','कीबोर्ड','माउस'], answer: 'प्रिंटर' },
    { question: 'कंप्यूटर का मस्तिष्क किसे कहते हैं?', options: ['CPU','RAM','मॉनिटर','कीबोर्ड'], answer: 'CPU' },
  ],
  '8': [
    { question: 'कौन सा नेटवर्क छोटे क्षेत्र में कंप्यूटर को जोड़ता है?', options: ['LAN','WAN','MAN','PAN'], answer: 'LAN' },
    { question: 'इनमें से कौन सा आउटपुट डिवाइस है?', options: ['मॉनिटर','कीबोर्ड','माउस','स्कैनर'], answer: 'मॉनिटर' },
    { question: 'HTML का प्रयोग किस लिए होता है?', options: ['वेब पेज','एप्लिकेशन प्रोग्रामिंग','डेटाबेस मैनेजमेंट','नेटवर्किंग'], answer: 'वेब पेज' },
    { question: 'सॉफ़्टवेयर क्या है?', options: ['प्रोग्राम','हार्डवेयर','बिजली','मॉनिटर'], answer: 'प्रोग्राम' },
  ],
  '9': [
    { question: 'प्राथमिक स्टोरेज कौन सी है?', options: ['RAM','Hard Disk','CD','USB'], answer: 'RAM' },
    { question: 'कौन सा नेटवर्क बड़े क्षेत्र को कवर करता है?', options: ['WAN','LAN','MAN','PAN'], answer: 'WAN' },
    { question: 'CPU की गति किसमें मापी जाती है?', options: ['GHz','MB','Volts','Watts'], answer: 'GHz' },
    { question: 'कौन सी प्रोग्रामिंग भाषा है?', options: ['Python','HTML','CSS','SQL'], answer: 'Python' },
  ],
  '10': [
    { question: 'डिजिटल को एनालॉग में बदलने वाला डिवाइस?', options: ['DAC','ADC','CPU','GPU'], answer: 'DAC' },
    { question: 'एनालॉग को डिजिटल में बदलने वाला डिवाइस?', options: ['ADC','DAC','Monitor','Keyboard'], answer: 'ADC' },
    { question: 'GPU का पूरा नाम?', options: ['Graphics Processing Unit','General Processing Unit','Graphical Program Unit','Global Processing Unit'], answer: 'Graphics Processing Unit' },
    { question: 'SSD किससे तेज है?', options: ['HDD','RAM','CPU','Monitor'], answer: 'HDD' },
  ],
  '11': [
    { question: 'IoT का पूरा नाम क्या है?', options: ['Internet of Things','Internet on Time','Information of Technology','Interface of Tools'], answer: 'Internet of Things' },
    { question: 'मोशन डिटेक्ट करने वाला डिवाइस?', options: ['Sensor','Printer','Keyboard','Monitor'], answer: 'Sensor' },
    { question: 'कौन सा क्लाउड स्टोरेज है?', options: ['Google Drive','HDD','RAM','CPU'], answer: 'Google Drive' },
    { question: 'Python किसके लिए उपयोग होता है?', options: ['Programming','Networking','Hardware','Database'], answer: 'Programming' },
  ],
  '12': [
    { question: 'AI का पूरा नाम?', options: ['Artificial Intelligence','Automated Input','Analog Interface','Advanced Integration'], answer: 'Artificial Intelligence' },
    { question: 'कौन सा पहनने योग्य तकनीक का उदाहरण है?', options: ['Smartwatch','Keyboard','Monitor','Printer'], answer: 'Smartwatch' },
    { question: 'HTTP का उपयोग किसमें होता है?', options: ['Web','Hardware','Programming','Networking'], answer: 'Web' },
    { question: 'Machine Learning किसका हिस्सा है?', options: ['AI','Networking','Software','Hardware'], answer: 'AI' },
  ],
};

// --- TECHNOLOGY Odia QUESTIONS ---
const technologyOdiaQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'ସ୍କ୍ରିନ୍ ଉପରେ ପଏଣ୍ଟ କରିବା ପାଇଁ କେଉଁ ଡିଭାଇସ୍ ବ୍ୟବହାର ହୁଏ?', options: ['Mouse','Keyboard','Monitor','Printer'], answer: 'Mouse' },
    { question: 'CPU ପୂର୍ଣ୍ଣ ରୂପ କ’ଣ?', options: ['Central Processing Unit','Computer Personal Unit','Central Peripheral Unit','Control Processing Unit'], answer: 'Central Processing Unit' },
    { question: 'କେଉଁ ଡିଭାଇସ୍ ତଥ୍ୟ ସ୍ଥାୟୀ ଭାବରେ ସଞ୍ଚୟ କରେ?', options: ['Hard Drive','RAM','Cache','Register'], answer: 'Hard Drive' },
    { question: 'କେଉଁଟି ଇନପୁଟ୍ ଡିଭାଇସ୍?', options: ['Keyboard','Monitor','Printer','Speaker'], answer: 'Keyboard' },
  ],
  '7': [
    { question: 'ୱେବ ପେଜ୍ ବନାଇବା ପାଇଁ କେଉଁ ଭାଷା ବ୍ୟବହୃତ ହୁଏ?', options: ['HTML','Python','C++','Java'], answer: 'HTML' },
    { question: 'RAM ପୂର୍ଣ୍ଣ ରୂପ କ’ଣ?', options: ['Random Access Memory','Readily Available Memory','Rapid Access Memory','Read Access Memory'], answer: 'Random Access Memory' },
    { question: 'କେଉଁ ଡିଭାଇସ୍ ଡକ୍ୟୁମେଣ୍ଟ ପ୍ରିଣ୍ଟ କରେ?', options: ['Printer','Monitor','Keyboard','Mouse'], answer: 'Printer' },
    { question: 'କମ୍ପ୍ୟୁଟରର ମସ୍ତିଷ୍କ କ’ଣ?', options: ['CPU','RAM','Monitor','Keyboard'], answer: 'CPU' },
  ],
  // similarly 8–12...
};
// --- ENGINEERING English QUESTIONS ---
const engineeringEnglishQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'Which simple machine is a ramp?', options: ['Inclined Plane','Lever','Pulley','Wheel'], answer: 'Inclined Plane' },
    { question: 'Which material is used in making bridges?', options: ['Steel','Plastic','Wood','Paper'], answer: 'Steel' },
    { question: 'What tool measures length?', options: ['Ruler','Hammer','Screwdriver','Saw'], answer: 'Ruler' },
    { question: 'Which energy is used in engines?', options: ['Mechanical','Solar','Wind','Nuclear'], answer: 'Mechanical' },
  ],
  '7': [
    { question: 'Which is a type of lever?', options: ['First class','Second class','Third class','All of these'], answer: 'All of these' },
    { question: 'Which gas is used in welding?', options: ['Acetylene','Oxygen','Nitrogen','Helium'], answer: 'Acetylene' },
    { question: 'Which instrument measures pressure?', options: ['Manometer','Thermometer','Voltmeter','Ruler'], answer: 'Manometer' },
    { question: 'Bridge supports are called?', options: ['Piers','Deck','Abutments','Cables'], answer: 'Piers' },
  ],
  '8': [
    { question: 'Which engine works on spark ignition?', options: ['Petrol Engine','Diesel Engine','Steam Engine','Electric Engine'], answer: 'Petrol Engine' },
    { question: 'What is the function of a gearbox?', options: ['Change speed/torque','Store fuel','Cool engine','Measure pressure'], answer: 'Change speed/torque' },
    { question: 'Which material conducts electricity?', options: ['Copper','Rubber','Plastic','Wood'], answer: 'Copper' },
    { question: 'What is used to join metal parts?', options: ['Welding','Nailing','Gluing','Tying'], answer: 'Welding' },
  ],
  '9': [
    { question: 'Which energy powers turbines?', options: ['Kinetic','Potential','Chemical','Thermal'], answer: 'Kinetic' },
    { question: 'Which bridge type uses cables?', options: ['Suspension','Beam','Arch','Cantilever'], answer: 'Suspension' },
    { question: 'Which gear changes rotational speed?', options: ['Spur Gear','Bevel Gear','Worm Gear','Rack and Pinion'], answer: 'Spur Gear' },
    { question: 'Which machine multiplies force?', options: ['Lever','Pulley','Inclined Plane','All of these'], answer: 'All of these' },
  ],
  '10': [
    { question: 'Which power converts mechanical to electrical?', options: ['Generator','Motor','Turbine','Battery'], answer: 'Generator' },
    { question: 'Which engine uses compression ignition?', options: ['Diesel Engine','Petrol Engine','Steam Engine','Electric Engine'], answer: 'Diesel Engine' },
    { question: 'Bridge height supports are called?', options: ['Piers','Deck','Abutments','Cables'], answer: 'Abutments' },
    { question: 'Which instrument measures current?', options: ['Ammeter','Voltmeter','Thermometer','Manometer'], answer: 'Ammeter' },
  ],
  '11': [
    { question: 'What is nanotechnology used for?', options: ['Tiny devices','Bridges','Engines','Electrical circuits'], answer: 'Tiny devices' },
    { question: 'Which energy converts sunlight to electricity?', options: ['Solar','Wind','Mechanical','Thermal'], answer: 'Solar' },
    { question: 'Which tool measures force?', options: ['Dynamometer','Thermometer','Ruler','Voltmeter'], answer: 'Dynamometer' },
    { question: 'Which machine helps lift heavy loads?', options: ['Pulley','Lever','Inclined Plane','All of these'], answer: 'All of these' },
  ],
  '12': [
    { question: 'Which system controls machines automatically?', options: ['Automation','Hydraulics','Pneumatics','Robotics'], answer: 'Automation' },
    { question: 'Which engine converts heat to motion?', options: ['Heat Engine','Electric Engine','Solar Engine','Steam Engine'], answer: 'Heat Engine' },
    { question: 'Which material resists corrosion?', options: ['Stainless Steel','Iron','Copper','Aluminium'], answer: 'Stainless Steel' },
    { question: 'Which branch deals with circuits and electronics?', options: ['Electrical Engineering','Civil Engineering','Mechanical Engineering','Chemical Engineering'], answer: 'Electrical Engineering' },
  ],
};

// --- ENGINEERING Hindi QUESTIONS ---
const engineeringHindiQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'साधारण मशीन में से किसे ढलान कहते हैं?', options: ['Inclined Plane','Lever','Pulley','Wheel'], answer: 'Inclined Plane' },
    { question: 'पुल बनाने में कौन सा पदार्थ इस्तेमाल होता है?', options: ['Steel','Plastic','Wood','Paper'], answer: 'Steel' },
    { question: 'लंबाई मापने का उपकरण कौन सा है?', options: ['Ruler','Hammer','Screwdriver','Saw'], answer: 'Ruler' },
    { question: 'इंजन में कौन सी ऊर्जा उपयोग होती है?', options: ['Mechanical','Solar','Wind','Nuclear'], answer: 'Mechanical' },
  ],
  '7': [
    { question: 'लीवर के प्रकार कौन-कौन से हैं?', options: ['First class','Second class','Third class','All of these'], answer: 'All of these' },
    { question: 'वेल्डिंग में कौन सी गैस इस्तेमाल होती है?', options: ['Acetylene','Oxygen','Nitrogen','Helium'], answer: 'Acetylene' },
    { question: 'दबाव मापने का यंत्र कौन सा है?', options: ['Manometer','Thermometer','Voltmeter','Ruler'], answer: 'Manometer' },
    { question: 'पुल के सहारे को क्या कहते हैं?', options: ['Piers','Deck','Abutments','Cables'], answer: 'Piers' },
  ],
  '8': [
    { question: 'कौन सा इंजन स्पार्क इग्निशन पर काम करता है?', options: ['Petrol Engine','Diesel Engine','Steam Engine','Electric Engine'], answer: 'Petrol Engine' },
    { question: 'गियरबॉक्स का कार्य क्या है?', options: ['Change speed/torque','Store fuel','Cool engine','Measure pressure'], answer: 'Change speed/torque' },
    { question: 'कौन सा पदार्थ विद्युत का प्रवाह करता है?', options: ['Copper','Rubber','Plastic','Wood'], answer: 'Copper' },
    { question: 'धातु के हिस्सों को जोड़ने के लिए क्या उपयोग होता है?', options: ['Welding','Nailing','Gluing','Tying'], answer: 'Welding' },
  ],
  '9': [
    { question: 'कौन सी ऊर्जा टरबाइन को चलाती है?', options: ['Kinetic','Potential','Chemical','Thermal'], answer: 'Kinetic' },
    { question: 'कौन सा पुल प्रकार केबल का उपयोग करता है?', options: ['Suspension','Beam','Arch','Cantilever'], answer: 'Suspension' },
    { question: 'कौन सा गियर घूर्णन की गति बदलता है?', options: ['Spur Gear','Bevel Gear','Worm Gear','Rack and Pinion'], answer: 'Spur Gear' },
    { question: 'कौन सी मशीन बल बढ़ाती है?', options: ['Lever','Pulley','Inclined Plane','All of these'], answer: 'All of these' },
  ],
  '10': [
    { question: 'कौन सा उपकरण यांत्रिक को विद्युत में बदलता है?', options: ['Generator','Motor','Turbine','Battery'], answer: 'Generator' },
    { question: 'कौन सा इंजन कम्प्रेशन इग्निशन पर काम करता है?', options: ['Diesel Engine','Petrol Engine','Steam Engine','Electric Engine'], answer: 'Diesel Engine' },
    { question: 'पुल के ऊँचाई सहारे को क्या कहते हैं?', options: ['Piers','Deck','Abutments','Cables'], answer: 'Abutments' },
    { question: 'धारा मापने का यंत्र कौन सा है?', options: ['Ammeter','Voltmeter','Thermometer','Manometer'], answer: 'Ammeter' },
  ],
  '11': [
    { question: 'नैनोप्रौद्योगिकी किसके लिए उपयोग होती है?', options: ['Tiny devices','Bridges','Engines','Electrical circuits'], answer: 'Tiny devices' },
    { question: 'कौन सी ऊर्जा सूर्य की रोशनी को विद्युत में बदलती है?', options: ['Solar','Wind','Mechanical','Thermal'], answer: 'Solar' },
    { question: 'बल मापने का यंत्र कौन सा है?', options: ['Dynamometer','Thermometer','Ruler','Voltmeter'], answer: 'Dynamometer' },
    { question: 'कौन सी मशीन भारी वस्तुएँ उठाने में मदद करती है?', options: ['Pulley','Lever','Inclined Plane','All of these'], answer: 'All of these' },
  ],
  '12': [
    { question: 'कौन सा सिस्टम मशीनों को स्वचालित रूप से नियंत्रित करता है?', options: ['Automation','Hydraulics','Pneumatics','Robotics'], answer: 'Automation' },
    { question: 'कौन सा इंजन ताप को गति में बदलता है?', options: ['Heat Engine','Electric Engine','Solar Engine','Steam Engine'], answer: 'Heat Engine' },
    { question: 'कौन सा पदार्थ जंग-रोधी है?', options: ['Stainless Steel','Iron','Copper','Aluminium'], answer: 'Stainless Steel' },
    { question: 'कौन सा शाखा सर्किट और इलेक्ट्रॉनिक्स से संबंधित है?', options: ['Electrical Engineering','Civil Engineering','Mechanical Engineering','Chemical Engineering'], answer: 'Electrical Engineering' },
  ],
};

// --- ENGINEERING Odia QUESTIONS ---
const engineeringOdiaQuestions: SubjectQuestionsData = {
  '6': [
    { question: 'ସରଳ ମେସିନ୍ ମଧ୍ୟରୁ କୋଣଟି ର୍ୟାମ୍ପ ଅଟେ?', options: ['Inclined Plane','Lever','Pulley','Wheel'], answer: 'Inclined Plane' },
    { question: 'ସେତୁ ନିର୍ମାଣରେ କେଉଁ ପଦାର୍ଥ ବ୍ୟବହୃତ ହୁଏ?', options: ['Steel','Plastic','Wood','Paper'], answer: 'Steel' },
    { question: 'ଦୈର୍ଘ୍ୟ ମାପିବା ପାଇଁ କଣ ବ୍ୟବହୃତ ହୁଏ?', options: ['Ruler','Hammer','Screwdriver','Saw'], answer: 'Ruler' },
    { question: 'ଇଞ୍ଜିନରେ କେଉଁ ଶକ୍ତି ବ୍ୟବହୃତ ହୁଏ?', options: ['Mechanical','Solar','Wind','Nuclear'], answer: 'Mechanical' },
  ],
  '7': [
    { question: 'ଲିଭର ପ୍ରକାର କ’ଣ କ’ଣ ଅଟେ?', options: ['First class','Second class','Third class','All of these'], answer: 'All of these' },
    { question: 'ଵେଲଡିଂରେ କେଉଁ ଗ୍ୟାସ ବ୍ୟବହୃତ ହୁଏ?', options: ['Acetylene','Oxygen','Nitrogen','Helium'], answer: 'Acetylene' },
    { question: 'ଦବାଅ ମାପିବା ଯନ୍ତ୍ର କ’ଣ?', options: ['Manometer','Thermometer','Voltmeter','Ruler'], answer: 'Manometer' },
    { question: 'ସେତୁ ସମର୍ଥନକୁ କ’ଣ କୁହାଯାଏ?', options: ['Piers','Deck','Abutments','Cables'], answer: 'Piers' },
  ],

  '8': [
    { question: 'କେଉଁ ଇଞ୍ଜିନ୍ ସ୍ପାର୍କ ଇଗ୍ନିସନ୍ ଉପରେ କାମ କରେ?', options: ['Petrol Engine','Diesel Engine','Steam Engine','Electric Engine'], answer: 'Petrol Engine' },
    { question: 'ଗିୟରବକ୍ସର କାର୍ଯ୍ୟ କ’ଣ?', options: ['Change speed/torque','Store fuel','Cool engine','Measure pressure'], answer: 'Change speed/torque' },
    { question: 'କେଉଁ ପଦାର୍ଥ ଚୁମ୍ବକୀୟ ପ୍ରବାହକ?', options: ['Copper','Rubber','Plastic','Wood'], answer: 'Copper' },
    { question: 'ଧାତୁ ଭାଗ ଯୋଡିବା ପାଇଁ କଣ ବ୍ୟବହୃତ ହୁଏ?', options: ['Welding','Nailing','Gluing','Tying'], answer: 'Welding' },
  ],
  '9': [
    { question: 'ଟର୍ବାଇନ୍ କେଉଁ ଶକ୍ତି ସହିତ କାମ କରେ?', options: ['Kinetic','Potential','Chemical','Thermal'], answer: 'Kinetic' },
    { question: 'କେଉଁ ପୁଲ୍ ପ୍ରକାର କେବଲ୍ ବ୍ୟବହାର କରେ?', options: ['Suspension','Beam','Arch','Cantilever'], answer: 'Suspension' },
    { question: 'କେଉଁ ଗିୟର ଘୁରଣର ଗତି ବଦଳାଏ?', options: ['Spur Gear','Bevel Gear','Worm Gear','Rack and Pinion'], answer: 'Spur Gear' },
    { question: 'କେଉଁ ମେସିନ୍ ଶକ୍ତି ବଢାଏ?', options: ['Lever','Pulley','Inclined Plane','All of these'], answer: 'All of these' },
  ],
  '10': [
    { question: 'ଯାନ୍ତ୍ରିକକୁ ଭିଦ୍ୟୁତରେ ପରିବର୍ତ୍ତନ କରେ କେଉଁ ଉପକରଣ?', options: ['Generator','Motor','Turbine','Battery'], answer: 'Generator' },
    { question: 'କେଉଁ ଇଞ୍ଜିନ୍ କମ୍ପ୍ରେସନ୍ ଇଗ୍ନିସନ୍ ଉପରେ କାମ କରେ?', options: ['Diesel Engine','Petrol Engine','Steam Engine','Electric Engine'], answer: 'Diesel Engine' },
    { question: 'ପୁଲ୍ ଉଚ୍ଚତା ସମର୍ଥନ କ’ଣ କୁହାଯାଏ?', options: ['Piers','Deck','Abutments','Cables'], answer: 'Abutments' },
    { question: 'ବିଦ୍ୟୁତ ଧାରା ମାପିବା ଯନ୍ତ୍ର କ’ଣ?', options: ['Ammeter','Voltmeter','Thermometer','Manometer'], answer: 'Ammeter' },
  ],
  '11': [
    { question: 'ନାନୋପ୍ରଯୁକ୍ତି କାହିଁକି ବ୍ୟବହୃତ ହୁଏ?', options: ['Tiny devices','Bridges','Engines','Electrical circuits'], answer: 'Tiny devices' },
    { question: 'ସୂର୍ଯ୍ୟର ଆଲୋକକୁ ବିଦ୍ୟୁତରେ ପରିବର୍ତ୍ତନ କରେ କେଉଁ ଶକ୍ତି?', options: ['Solar','Wind','Mechanical','Thermal'], answer: 'Solar' },
    { question: 'ଶକ୍ତି ମାପିବା ଯନ୍ତ୍ର କ’ଣ?', options: ['Dynamometer','Thermometer','Ruler','Voltmeter'], answer: 'Dynamometer' },
    { question: 'ଭାରି ଭାର ଉଠାଇବାରେ କେଉଁ ମେସିନ୍ ସାହାଯ୍ୟ କରେ?', options: ['Pulley','Lever','Inclined Plane','All of these'], answer: 'All of these' },
  ],
  '12': [
    { question: 'କେଉଁ ସିଷ୍ଟମ୍ ମେସିନ୍ ସ୍ୱୟଂଚାଳିତ ଭାବେ ନିୟନ୍ତ୍ରଣ କରେ?', options: ['Automation','Hydraulics','Pneumatics','Robotics'], answer: 'Automation' },
    { question: 'କେଉଁ ଇଞ୍ଜିନ୍ ତାପକୁ ଗତିରେ ପରିବର୍ତ୍ତନ କରେ?', options: ['Heat Engine','Electric Engine','Solar Engine','Steam Engine'], answer: 'Heat Engine' },
    { question: 'କେଉଁ ପଦାର୍ଥ ଜଙ୍ଗ-ରୋଧକ?', options: ['Stainless Steel','Iron','Copper','Aluminium'], answer: 'Stainless Steel' },
    { question: 'କେଉଁ ସାଖା ସର୍କିଟ୍ ଓ ଇଲେକ୍ଟ୍ରୋନିକ୍ସ ସହିତ ସଂପୃକ୍ତ?', options: ['Electrical Engineering','Civil Engineering','Mechanical Engineering','Chemical Engineering'], answer: 'Electrical Engineering' },
  ],
};
// --- FINAL EXPORT ---
export const subjectQuestions: MasterQuestionData = {
  math: { en: mathEnglishQuestions, hi: mathHindiQuestions, od: mathOdiaQuestions },
  science: { en: scienceEnglishQuestions, hi: scienceHindiQuestions, od: scienceOdiaQuestions },
  technology: { en: technologyEnglishQuestions, hi: technologyHindiQuestions, od: technologyOdiaQuestions },
  engineering: { en: engineeringEnglishQuestions, hi: engineeringHindiQuestions, od: engineeringOdiaQuestions },
};

export const masterQuestions: MasterQuestionData = {
  en: {
    math: mathEnglishQuestions,
    science: scienceEnglishQuestions,
    technology: technologyEnglishQuestions,
    engineering: engineeringEnglishQuestions,
  },
  hi: {
    math: mathHindiQuestions,
    science: scienceHindiQuestions,
    technology: technologyHindiQuestions,
    engineering: engineeringHindiQuestions,
  },
  od: {
    math: mathOdiaQuestions,
    science: scienceOdiaQuestions,
    technology: technologyOdiaQuestions,
    engineering: engineeringOdiaQuestions,
  },
};