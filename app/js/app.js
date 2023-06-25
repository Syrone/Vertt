// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {


	//Страница Hanky Code.
	//Swiper из второго блока
	const swiperLeftAuto = new Swiper('.swiper-left-auto', {
		a11y: false,
		direction: 'horizontal',
		loop: true,
		speed: 7000,
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
		speed: 11000,
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

	const swiperContainer1 = document.querySelector('.swiper-left-auto');
	const swiperContainer2 = document.querySelector('.swiper-left-auto2');

	if (swiperContainer1 && swiperContainer2) {
		swiperContainer1.addEventListener('mouseenter', () => {
			swiperLeftAuto.autoplay.stop();
		});

		swiperContainer1.addEventListener('mouseleave', () => {
			swiperLeftAuto.autoplay.start();
		});

		swiperContainer2.addEventListener('mouseenter', () => {
			swiperLeftAuto2.autoplay.stop();
		});

		swiperContainer2.addEventListener('mouseleave', () => {
			swiperLeftAuto2.autoplay.start();
		});
	}

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

	//Копируем блок и вставляем в другой.
	let copyBlocks = document.querySelectorAll('.product-left-copy'),
		duplicateBlocks = document.querySelectorAll('.product-left-duplicate');

	if (copyBlocks.length === 0 || duplicateBlocks.length === 0) {
		console.error('Блоки "product-left-copy" или "product-left-duplicate" не найдены');
	} else if (copyBlocks.length !== duplicateBlocks.length) {
		console.error('Количество блоков "product-left-copy" и "product-left-duplicate" не совпадает');
	} else {
		// Копируем содержимое из каждого блока 'product-left-copy' в соответствующий блок 'product-left-duplicate'
		for (let i = 0; i < copyBlocks.length; i++) {
			duplicateBlocks[i].innerHTML = copyBlocks[i].innerHTML;
		}
	}

	const productInfoCopy = document.querySelector('.product-info-copy');
	const productTopCopy = document.querySelector('.product-top-copy');

	const productInfoDuplicate = document.querySelector('.product-info-duplicate');
	const productTopDuplicate = document.querySelector('.product-top-duplicate');

	if (productInfoCopy && productInfoDuplicate) {
		productInfoDuplicate.innerHTML = productInfoCopy.innerHTML;
	} else {
		console.log('Не найдены элементы для копирования и вставки product-info');
	}

	if (productTopCopy && productTopDuplicate) {
		productTopDuplicate.innerHTML = productTopCopy.innerHTML;
	} else {
		console.log('Не найдены элементы для копирования и вставки product-top');
	}


	//Страница Dolls
	//Чтобы считывался клик по favorite на карточке good
	const elementsWrapperFav = document.querySelectorAll('.wrapper-fav');

	elementsWrapperFav.forEach(function (element) {
		element.addEventListener('click', function (event) {
			event.preventDefault();
		});
	});

	//offcanvas popup Блок с выбором input radio
	let radiosPopupProduct = document.querySelectorAll('.off_canvas-product-radio');

	if (radiosPopupProduct) {
		radiosPopupProduct.forEach(radio => {
			radio.addEventListener('change', function () {
				radiosPopupProduct.forEach(innerRadio => {
					let parent = innerRadio.closest('.off_canvas-product-input');
	
					if (innerRadio.checked) {
						parent.classList.add('checked');
					} else {
						parent.classList.remove('checked');
					}
				});
			});
		});
	}




	//ЭТО СМЕЛО УДАЛЯЙ
	const oceanwpGrid = document.getElementById('oceanwp-grid');
	const oceanwpList = document.getElementById('oceanwp-list');
	const products = document.querySelector('.products');

	if (oceanwpGrid && oceanwpList && products) {
		oceanwpGrid.addEventListener('click', (event) => {
			event.preventDefault();
			oceanwpList.classList.remove('active')
			oceanwpGrid.classList.add('active');
			if (!products.classList.contains('grid')) {
				products.classList.remove('list');
				products.classList.add('grid');
			}
		});

		oceanwpList.addEventListener('click', (event) => {
			event.preventDefault();
			oceanwpGrid.classList.remove('active');
			oceanwpList.classList.add('active')
			if (!products.classList.contains('list')) {
				products.classList.remove('grid');
				products.classList.add('list');
			}
		});
	}


})
