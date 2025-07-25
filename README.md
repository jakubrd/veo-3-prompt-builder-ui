# 🎬 Veo 3 Prompt Builder

Interaktywny generator promptów do Veo 3 (Google Gemini Video). Pozwala użytkownikom łatwo tworzyć szczegółowe prompty do generowania wideo AI przez wypełnienie formularza i eksport do JSON + prompt dla LLM.

## 🚀 Funkcje

- **Przyjazny interfejs** - Intuicyjny formularz z wszystkimi potrzebnymi polami
- **Generowanie JSON** - Tworzy strukturalne dane zgodne ze schematem Veo 3
- **Prompt dla LLM** - Gotowy prompt do ChatGPT/Claude/Gemini do ulepszenia
- **Naturalny prompt** - Gotowy do użycia prompt dla Veo 3
- **Kopiowanie jednym klikiem** - Łatwe kopiowanie wyników
- **Responsywny design** - Działa na wszystkich urządzeniach

## 📋 Jak używać

1. **Wypełnij formularz** - Wprowadź szczegóły swojego wideo
2. **Kliknij "Generuj JSON"** - System utworzy strukturalne dane
3. **Skopiuj JSON + Prompt** - Wklej do ChatGPT/Claude/Gemini
4. **Poproś o ulepszenie** - LLM stworzy lepszy prompt
5. **Użyj w Veo 3** - Wklej finalny prompt w Google AI Studio

## 🛠️ Technologie

- **HTML5** - Semantyczna struktura
- **CSS3** - Responsywny design z gradientami
- **Vanilla JavaScript** - Bez zewnętrznych zależności
- **GitHub Pages** - Hosting statyczny

## 📁 Struktura plików

```
veo3-prompt-builder/
│
├── index.html          # Główna strona z formularzem
├── style.css           # Style CSS
├── script.js           # Logika JavaScript
└── README.md           # Dokumentacja
```

## 🎯 Sekcje formularza

### 📋 Podstawowe informacje
- Pomysł na wideo
- Długość (1-8 sekund)
- Proporcje (16:9, 9:16, itp.)

### 👤 Postać główna
- Nazwa/imię
- Wiek i wzrost
- Opis wyglądu
- Ubiór i charakter

### 🏢 Miejsce i sceneria
- Lokalizacja
- Pora dnia
- Szczegóły otoczenia

### 🎭 Akcja i ruch
- Co robi postać
- Rekwizyty (opcjonalne)

### 📹 Ujęcie i kamera
- Kompozycja kadru
- Ruch kamery
- Sprzęt/styl

### 💡 Oświetlenie i atmosfera
- Oświetlenie
- Nastrój
- Kolorystyka

### 💬 Dialog i dźwięk
- Dialog (obowiązkowy dla Veo 3)
- Styl audio
- Emocja głosu

## 🔧 Development

### Uruchomienie lokalne

```bash
# Sklonuj repozytorium
git clone [repo-url]
cd veo3-prompt-builder

# Uruchom serwer lokalny (przykład z Python)
python -m http.server 8000

# Lub z Node.js
npx serve .

# Otwórz w przeglądarce
open http://localhost:8000
```

### Debug mode

Dodaj `?debug` do URL aby aktywować przyciski testowe:
```
http://localhost:8000?debug
```

## 📝 Przykład użycia

1. **Wypełnij podstawowe informacje:**
   - Pomysł: "Szef kuchni prezentuje autorskie risotto"
   - Długość: 8 sekund
   - Proporcje: 16:9

2. **Opisz postać:**
   - Nazwa: "Chef Marco"
   - Wiek: 35
   - Opis: "Doświadczony szef kuchni o pewnej postawie"

3. **Zdefiniuj scenę:**
   - Lokalizacja: "Nowoczesna kuchnia restauracyjna"
   - Dialog: "To jest moja autorska interpretacja klasycznego risotto!"

4. **Wygeneruj i skopiuj** wyniki do LLM

## 🌐 GitHub Pages

Strona jest automatycznie deployowana na GitHub Pages pod adresem:
`https://[username].github.io/veo3-prompt-builder/`

## 📞 Wsparcie

Jeśli masz pytania lub sugestie:
- Otwórz issue na GitHub
- Skontaktuj się przez Twitter/X

## 📄 Licencja

MIT License - możesz swobodnie używać i modyfikować kod.

---

**🎬 Stworzony dla twórców wideo AI | Powered by Veo 3 & GitHub Pages**