<template>
    <div class="header">
        <div class="header__search-box">
            <div class="header__search-box__search">
                <img src="src/assets/icons/search.svg" alt="" />
                <input v-model="searchValue" type="text" placeholder="티커, 이름으로 검색" class="input" @keydown.enter="search" />
            </div>
            <span class="header__search-box__date">{{ current }}</span>
        </div>
        <div class="header__profile-box">
            <button class="header__profile-box__alert-button">
                <img src="src/assets/icons/bell.svg" alt="" />
            </button>
            <div class="header__profile-box__profile">
                <img src="src/assets/images/profile.jpeg" alt="" class="image" />
                <span class="name">HACKKERS</span>
                <button class="button">
                    <img src="src/assets/icons/arrow-down.svg" alt="" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useStore } from "@store/index"
import router from "@/routes"

const current = ref<string>("")
const clock = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    if (hour < 12) {
        const res = `${year}년 ${month + 1}월 ${day}일 오전${hour < 10 ? `0${hour}` : hour}시 ${minute < 10 ? `0${minute}` : minute}분 ${second < 10 ? `0${second}` : second}초`
        current.value = res
    } else {
        const res = `${year}년 ${month + 1}월 ${day}일 오후${hour < 10 ? `0${hour}` : hour - 12}시 ${minute < 10 ? `0${minute}` : minute}분 ${second < 10 ? `0${second}` : second}초`
        current.value = res
    }
}
function init() {
    clock()
    setInterval(clock, 1000)
}

const store = useStore()
const searchValue = ref<string>("")
function search() {
    // Store로 데이터 전달 및 세팅
    store.searchValue = searchValue.value
    store.isLoading = true

    setTimeout(() => {
        store.getStock(searchValue.value, "")
        store.isLoading = false
    }, 2000)

    // about 페이지로 이동
    router.push({ name: "About", query: { ticker: searchValue.value } })
}

onMounted(() => {
    init()
})
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    &__search-box {
        display: flex;
        align-items: center;

        gap: 28px;

        &__search {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            width: 360px;

            padding: 14px;
            gap: 16px;

            border-radius: 8px;
            border: 1px solid $color-gray-300;
            background-color: $color-white-000;
            box-shadow: 0px 2px 8px 0px rgba(228, 231, 236, 0.7);

            &:focus-within {
                border-radius: 8px;
                border: 1px solid var(--blue-500, #2e90fa);
                background: #fff;
                box-shadow: 0px 0px 8px 0px rgba(21, 112, 239, 0.3);

                .input {
                    color: $color-gray-800;
                }
            }
            .input {
                outline: none;
                border: none;

                width: 320px;

                font-size: 17px;
                font-weight: 500;
                line-height: 17px;

                color: $color-gray-500;
            }
        }

        &__date {
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;

            color: $color-gray-500;
        }
    }

    &__profile-box {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 16px;

        &__alert-button {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 56px;
            height: 56px;

            padding: 4px;

            border-radius: 8px;
            border: 1px solid $color-gray-300;
            background-color: $color-white-000;

            cursor: pointer;
        }
        &__profile {
            display: flex;
            align-items: center;

            padding: 7px 16px;

            border-radius: 8px;
            border: 1px solid $color-gray-300;
            background-color: $color-white-000;

            .image {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 36px;
                height: 36px;

                border-radius: 36px;
                border: 2px solid $color-success-500;
            }
            .name {
                font-size: 18px;
                font-weight: 700;

                margin: 0 12px 0 8px;
            }
            .button {
                display: flex;
                align-items: center;
                justify-content: center;

                padding: 4px;

                outline: none;
                border: none;

                background: transparent;

                cursor: pointer;
            }
        }
    }
}
</style>
