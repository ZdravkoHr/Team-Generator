const modalParent = document.querySelector('.modal-parent');
const modal = document.querySelector('.modal-parent .modal');
const modalContent = document.querySelector('.modal .modal-content');
const modalCloseBtn = document.querySelector('.modal .close');
const modalsInfo = {
    'app-info': {
        heading: 'За приложението',
        html: ` <div class="info-part">
        <h3 class="heading">Предназначение</h3>
        <div class="info-part-text">
            <p>Това, което приложението прави, е да разделя в отбори хора, чиито имена са предоставени от потребителя, на напълно случаен принцип. Отборите могат да бъдат използвани за разпределение на играчи в някоя игра или по преценка на потребителя.</p>
        </div>
    </div>
    <div class="info-part">
        <h3 class="heading">Предназначение</h3>
        <div class="info-part-text">
            <p>Това, което приложението прави, е да разделя в отбори хора, чиито имена са предоставени от потребителя, на напълно случаен принцип. Отборите могат да бъдат използвани за разпределение на играчи в някоя игра или по преценка на потребителя.</p>
        </div>
    </div>
    <div class="info-part">
        <h3 class="heading">Как работи приложението?</h3>
        <div class="info-part-text">
            <p>За да получите желаните отбори, трябва да въведете имената на хората, разделени със запетаи (Разделят се имената на един човек и имената на друг, а не – името, презимето и фамилията на един човек. Например – Иван Петров Георгиев, Георги, Мартин Антонов.) и колко отбора желаете да бъдат сформирани. След като сте попълнили нужната информация и цъкнете бутона, ще получите известие в долния десен ъгъл. Ако всичко е наред, натискайки върху известието, ще се отвори т.нар. Team Board, където са Вашите отбори. В противен случай, ще бъдете известен/а, че има проблем. Тогава трябва да проверите предоставената от Вас информация</p> 
                <p>Възможни причини за случване на грешка са:
                    <ul class="list">
                        <li>оставили сте някое от полетата празни, т.е без информация;</li>
                        <li>искате да сформирате повече отбори, отколкото са хората, например – 2 човека и 3 отбора;</li>
                        <li>написали сте нещо, различно от цяло число, в полето, в което трябва да кажете колко отбора желаете.</li>
                    </ul>
                </p>
        </div>
    </div>
    <div class="info-part">
        <h3 class="heading">Меню</h3>
        <div class="info-part-text">
            <p>В менюто ще откриете няколко опции:
                <ol class="list">
                    <li>информация за приложението – отваря информацията за приложението – информацията, която четете в момента;</li>
                    <li>иконка, която отваря Team Board-а при кликане;</li>
                    <li>насторойки, в които можете да управлявате начина на разделяне на хора по отбори и как ще бъдат показани в Team Board-a.</li>
                </ol>
            </p>
        </div>
    </div>
    <div class="info-part">
        <h3 class="heading">За приложението</h3>
        <div class="info-part-text">
            <p>Приложението е създадено с HTML и е украсено със CSS. Логиката на програмата, както и динамиката, са написани на JavaScript. Приложението се адаптира към различните размери на екраните. Не са използвани допълнителни рамки, библиотеки и т.н.</p>
        </div>
    </div>`
    },
    'team-board': {
        heading: 'Team Board',
        html: `<div class="sort-lists">
        <div class="item">
            <label>Подреди отборите по:</label>
            <select name="sort-teams" id="sort-teams">
                <option id="defaultSortTeamsOption">-</option>
                <option value="alphabeticIncrement">азбучен/цифрен ред (възходящо)</option>
                <option value="alphabeticDecrement">азбучен/цифрен ред (низходящо)</option>
                <option value="lengthIncrement">дължина на името (възходящо)</option>
                <option value="lengthDecrement">дължина на името (низходящо)</option>
            </select>
        </div>
        <div class="item">
            <label>Подреди членовете по:</label>
            <select name="sort-members" id="sort-members">
                <option id="defaultSortMembersOption">-</option>
                <option value="alphabeticIncrement">азбучен/цифрен ред (възходящо)</option>
                <option value="alphabeticDecrement">азбучен/цифрен ред (низходящо)</option>
                <option value="lengthIncrement">дължина на името (възходящо)</option>
                <option value="lengthDecrement">дължина на името (низходящо)</option>
            </select>
        </div>`
    },
    'app-settings': {
        heading: 'Настройки',
        html: `<label>Ако отборите не могат да бъдат с равен брой членове: </label>
        <select name="not-equal-teams" id="not-equal-teams">
            <option value="true">да бъдат с неравен брой членове</option>
            <option value="false">нужният брой души да не бъде добавян към отборите</option>
        </select>
        <div class="btn save-settings">Запази</div>`
    }
}

const closeModal = () => {
    // Target and remove the additional div which is added in the team board
    const additionalDiv = document.querySelector('.modal .additional-div');
    modal.removeChild(additionalDiv);
    modalParent.classList.add('d-none');
    modalParent.setAttribute('id', '');
}

function openModal() {
    modalParent.classList.remove('d-none');
    modalParent.setAttribute('id', this.dataset.open);
    setModalInfo(this.dataset.open);
}

function setModalInfo(id) {
    const heading = document.querySelector('.modal header .heading');
    heading.innerHTML = modalsInfo[id].heading;
    if (id === 'team-board') {
        /*Here i add additional div between the header and the modal content.
        This addtional div holds the select lists for sorting*/
        const additionalDiv = document.createElement('div');
        additionalDiv.classList.add('additional-div');
        additionalDiv.innerHTML = modalsInfo[id].html;
        modal.removeChild(modalContent);
        modal.appendChild(additionalDiv);
        modal.appendChild(modalContent);
        if (!modalContent.innerHTML.trim()) modalContent.innerHTML = noResults();
    }
    else modalContent.innerHTML = modalsInfo[id].html;
    
 }

modalCloseBtn.addEventListener('click', closeModal);