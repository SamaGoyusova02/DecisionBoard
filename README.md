# Decision Board

Bir mövzu yazıb seçimlər əlavə etdiyin, sonra onlardan birini seçərək
nəticəni gördüyün sadə qərar tətbiqi. Bir neçə decision paralel saxlanılır
və aralarında sərbəst keçid etmək mümkündür.

## Texnologiyalar

- React 
- Vite
- Sadə custom CSS (hazır UI kitabxanası istifadə olunmayıb, dizayn tam
  bu layihə üçün hazırlanıb)
- Google Fonts: Fraunces (başlıqlar) + Space Grotesk (interfeys)
- Data saxlama: `localStorage`

## Əsas funksiyalar

- Yeni decision yaratmaq (mövzu + ən azı 2 seçim)
- Mövcud decision-a əlavə seçim əlavə etmək
- Seçimlərdən birini seçmək və nəticəni dərhal görmək
- Seçimi sıfırlamaq
- Decision-u silmək
- Sidebar üzərindən bir neçə decision arasında keçid etmək
- Bütün data brauzerin `localStorage`-ında saxlanılır, səhifə
  yenilənəndə itmir

## Necə işə salmaq olar

```bash
npm install
npm run dev
```

Build üçün:

```bash
npm run build
npm run preview
```

## Qərar verdiyim texniki yanaşmalar

**Eyni seçimə təkrar klik problemi.** Hər decision üçün nəticə ayrıca bir
sayğac və ya toplanan səs siyahısı kimi deyil, sadəcə
`selectedOptionId` adlı tək bir state sahəsi kimi saxlanılır. Seçim et
funksiyası yeni klik gələndə əvvəlki seçimi artırmır və ya hər klikdə
əlavə "səs" yazmır — sadəcə həmin state-i yenidən təyin edir:

```js
function selectOption(decisionId, optionId) {
  setDecisions(prev =>
    prev.map(d => {
      if (d.id !== decisionId) return d;
      if (d.selectedOptionId === optionId) return d;
      return { ...d, selectedOptionId: optionId };
    })
  );
}
```

Beləliklə eyni seçimə on dəfə klik etsən belə nəticə dəyişmir, çünki
state artıq həmin dəyərdədirsə heç bir update baş vermir (idempotent
əməliyyat). Hesablama üçün ayrıca say saxlamadığımız üçün "səhv
hesablama" riski əslində struktur baxımından mövcud deyil — nəticə hər
zaman ən son klikin birbaşa əksidir, toplanan bir dəyər deyil.

**Data modeli.** Bütün decision-lar tək bir massiv kimi `localStorage`-da
saxlanılır (`decision-board:v1` açarı altında). Hər decision öz `id`,
`topic`, `options[]` və `selectedOptionId`-ni daşıyır, bu da decision-lar
arasında keçidi state-dən asılı olmadan sadə saxlayır.

**Komponent bölgüsü.** `useDecisions` hook-u bütün data məntiqini (CRUD +
persist) təcrid edir ki, komponentlər yalnız UI ilə məşğul olsun:
`Sidebar`, `DecisionTicket`, `NewDecisionForm`, `EmptyState`.

**Responsive.** Desktop-da iki sütunlu grid (sidebar + board), mobile-da
(≤780px) sidebar tam ekranlı slide-in panelə çevrilir, üst tərəfdə
"My Decisions" düyməsi ilə açılır.
