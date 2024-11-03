# Wstępny plan

## 1. Profil Użytkownika
- Każdy użytkownik (Admin/manager/User) może mieć profil z kluczowymi informacjami jak dane kontaktowe, biografia, specjalizacja, media społecznościowe.
- Personalizacja: Możliwość dodawania zdjęcia profilowego, linków do mediów społecznościowych, krótkiej biografii.

## 2. System Notyfikacji i Przypomnień
- Powiadomienia push: Automatyczne powiadomienia o nowych wiadomościach, zmianach w kalendarzu lub aktualizacjach w to-do.
- Alerty priorytetowe: Admin może oznaczyć określone zadania lub terminy jako „ważne”, co wywoła dodatkowe przypomnienia.

## 3. Zaawansowany System Briefów
- Podział na sekcje: Struktura briefów podzielona na różne sekcje, takie jak cele, harmonogram, budżet, wymagania kreatywne, z automatycznymi miejscami na wypełnienie.

## 4. Automatyzacja Współpracy
- Checklisty dla kampanii: Lista kontrolna dla każdego projektu z punktami do odhaczenia (np. zatwierdzenie briefu, publikacja postów, raportowanie wyników).

## 5. Moduł Zarządzania Kontaktem
- Automatyczne przypomnienia o follow-up’ach: Po zakończeniu kampanii system może przypominać o dalszej komunikacji z klientem.

## 6. Funkcja Feedbacku i Oceny
- Ocena kampanii przez użytkowników: Możliwość, aby użytkownicy lub admin ocenili zakończone kampanie, co pozwoli na naukę na przyszłość.

## 7. Personalizacja Dashboardu 
- Kolorystyka i motywy: Możliwość personalizacji kolorystyki i stylu dashboardu.

## Role Użytkowników i Ich Uprawnienia

### Admin
Ma pełny dostęp do wszystkich funkcji, wgląd w ustawienia aplikacji, zarządzanie dostępami oraz edycję zawartości, którą tworzą inni użytkownicy.

**Uprawnienia Admina:**
- Dashboard: Może dostosowywać i zarządzać widgetami na Dashboardzie, dodawać nowe sekcje oraz przypisywać je do odpowiednich użytkowników.
- Timeline/Kalendarz: Może dodawać, edytować i usuwać wydarzenia, zatwierdzać propozycje wydarzeń od innych użytkowników oraz oznaczać wydarzenia jako „publiczne” lub „prywatne”.
- Lista To-Do: Admin może tworzyć zadania, które będą widoczne dla całego zespołu lub tylko dla niego; ma też możliwość edycji i oznaczania przypomnień jako „publiczne”.
- Briefy reklamowe: Tworzy i modyfikuje briefy, które będą widoczne dla sztabu managerskiego i użytkowników. Może również oznaczać status briefu jako „zatwierdzony” lub „w trakcie realizacji”. 

### Sztab Managerski
Zarządza poszczególnymi osobami (użytkownikami) oraz kampaniami. Ma dostęp do edytowania treści oraz komunikowania się z klientami i użytkownikami.

**Uprawnienia Sztabu Managerskiego:**
- Dashboard: Widzi dostosowany dashboard z najważniejszymi informacjami o użytkownikach, statystykami kampanii oraz harmonogramem współprac.
- Timeline/Kalendarz: Może dodawać oraz proponować wydarzenia do kalendarza, komentować, ale potrzebuje zgody Admina na publikację ważnych terminów. 
- Lista To-Do: Może tworzyć zadania dla swoich podopiecznych oraz ustawiać priorytety dla kluczowych zadań. Widziana przez nich lista uwzględnia przypomnienia stworzone przez innych członków zespołu.
- Briefy reklamowe: Może przeglądać briefy, dodawać uwagi i współpracować nad ostateczną wersją.

### User (Osoba zarządzana)
Osoba, której działania są monitorowane i koordynowane w systemie. Ma ograniczony dostęp do edytowania elementów publicznych, a większość treści i zadań widzi w formie przydzielonej przez sztab managerski i admina.

**Uprawnienia Usera:**
- Dashboard: Widzi dostosowany widok swojego harmonogramu, listy zadań oraz statystyk własnych postów.
- Timeline/Kalendarz: Może tworzyć wydarzenia „prywatne” lub sugerować je jako „publiczne”, co wymaga zatwierdzenia przez Admina lub sztab managerski. 
- Lista To-Do: Może edytować listę zadań dla własnych potrzeb i oznaczać, które mają być widoczne tylko dla niego, a które dla zespołu managerskiego. Ma ograniczoną możliwość edycji „publicznych” przypomnień.
- Briefy reklamowe: Może przeglądać informacje zawarte w briefach, dodawać uwagi oraz zaznaczać swoje preferencje, lecz nie ma pełnych uprawnień do ich edytowania.

### Elementy Dashboardu
#### Kalendarz i Timeline
Wyświetla harmonogram wydarzeń oraz przypomnienia i zadania z listy To-Do.
Każdy użytkownik widzi kalendarz dostosowany do swoich uprawnień:
- Admin: Widzi wszystkie wydarzenia, może przeglądać, dodawać, edytować oraz oznaczać wydarzenia jako publiczne lub prywatne.
- Sztab Managerski: Widzi wszystkie wydarzenia dotyczące swoich użytkowników, może dodawać komentarze i proponować nowe wydarzenia.
- User: Widzi wydarzenia, w których uczestniczy, może dodać prywatne przypomnienia.

#### Lista To-Do
Zorganizowana lista zadań, która może być filtrowana po tagach, priorytetach oraz terminach.
Dostępne funkcje:
- Admin: Może dodawać i edytować zadania, ustawiać je jako publiczne lub prywatne.
- Sztab Managerski: Może dodawać przypomnienia dla swoich użytkowników.
- User: Może edytować zadanie i dodawać zadania, które będą wyświetlać się tylko u niego.

#### Moduł Briefów Reklamowych
Wyświetla streszczenie i szczegóły kampanii.
Funkcje:
- Admin i Sztab Managerski: Pełna edycja briefu. 
- User: Widzi jedynie finalną wersję z opcją dodawania komentarzy.

