// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	//Swiper из второго блока
	const swiperLeftAuto = new Swiper('.swiper-left-auto', {
		a11y: false,
		direction: 'horizontal',
		loop: true,
		speed: 4000,
		spaceBetween: 50,
		slidesPerView: 'auto',
		freeMode: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},

		noSwiping: true,
		noSwipingClass: 'swiper-slide',
	});

	//Swiper из второго блока
	const swiperLeftAuto2 = new Swiper('.swiper-left-auto2', {
		a11y: false,
		direction: 'horizontal',
		loop: true,
		speed: 7000,
		spaceBetween: 50,
		slidesPerView: 'auto',
		freeMode: true,
		autoplay: {
			delay: 0.2,
			disableOnInteraction: false,
		},

		noSwiping: true,
		noSwipingClass: 'swiper-slide',
	});

	//Swiper из третьего блока
	const swiperEffectCards = new Swiper(".swiper-effect-card", {
		effect: "cards",
		grabCursor: true,
		slidesPerView: "auto",
		centeredSlides: true,
		noSwiping: true,
		noSwipingClass: 'swiper-slide',

		cardsEffect: {
			perSlideOffset: 15,
			rotate: false,
			slideShadows: true,
		},
	});

	//Swiper из третьего блока в popup окне
	const swiperEffectCards2 = new Swiper(".swiper-effect-card2", {
		grabCursor: true,
		slidesPerView: 1,
		spaceBetween: 50,

		navigation: {
			nextEl: '.swiper-effect-card2-next',
			prevEl: '.swiper-effect-card2-prev',
		},

		scrollbar: {
			el: '.swiper-effect-card2-scrollbar',
			draggable: true,
			dragSize: 'auto',
		 },
	});


	// Переворот карточек swiper-left-auto и swiper-left-auto2
	let slideItems = document.querySelectorAll('.slide-item');

	if (slideItems) {
		slideItems.forEach(slide => {
			slide.addEventListener('click', function () {
				this.classList.add('active');
			});
		});

		let slideCloseButtons = document.querySelectorAll('.slide-item-close');

		slideCloseButtons.forEach(button => {
			button.addEventListener('click', function (event) {
				event.stopPropagation();
				let slide = this.closest('.slide-item');
				if (slide) {
					slide.classList.remove('active');
				}
			});
		});
	}

	//Кастомный Select
	class CustomSelect {
		constructor(selectElement) {
			this.selectElement = selectElement;
			this.selectButton = selectElement.querySelector('.select-button');
			this.selectContent = selectElement.querySelector('.select-content');
			this.options = Array.from(selectElement.querySelectorAll('.options li'));

			this.selectButton.addEventListener('click', () => this.toggleOptions());
			this.options.forEach(option => {
				option.addEventListener('click', () => this.selectOption(option));
			});

			document.addEventListener('click', (event) => this.closeOptions(event));
		}

		toggleOptions() {
			this.selectElement.classList.toggle('active');
		}

		selectOption(option) {
			const selectedText = option.textContent;
			this.selectButton.querySelector('.select').textContent = selectedText;
			this.toggleOptions();
		}

		closeOptions(event) {
			if (!this.selectElement.contains(event.target)) {
				this.selectElement.classList.remove('active');
			}
		}
	}

	const customSelects = Array.from(document.querySelectorAll('.custom-select'));
	if (customSelects) {
		customSelects.forEach(select => new CustomSelect(select));
	}

	// Получаем элементы списка
	const selectOptions = document.querySelectorAll('#swiper-select-color .options li');

	// Связывает Select и swiper выбором цвета
	if (selectOptions) {
		selectOptions.forEach((option, index) => {
			option.addEventListener('click', () => {
				swiperEffectCards.slideTo(index);
			});
		});
	}

	//Кастомный Popup
	class Popup {
		constructor(popupElement) {
			this.popup = popupElement;
			this.closeBtn = this.popup.querySelector('.custom-popup-close');
			this.closeBtn.addEventListener('click', () => this.close());
			window.addEventListener('click', (event) => {
				if (event.target == this.popup) {
					this.close();
				}
			});
			window.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					this.close();
				}
			});
		}

		open() {
			this.popup.classList.add('custom-popup-show');
			document.body.classList.add('overflow-hidden');
		}

		close() {
			this.popup.classList.remove('custom-popup-show');
			document.body.classList.remove('overflow-hidden');
		}
	}

	if (document.querySelectorAll('.open-popup')) {
		document.querySelectorAll('.open-popup').forEach(button => {
			const popupId = button.dataset.popupTarget;
			const popupElement = document.querySelector(popupId);
			const popup = new Popup(popupElement);
			button.addEventListener('click', () => popup.open());
		});
	}


})
