# ***YachtShop Admin Panel***

## Description

YachtShop Admin Panel –– a minimalist SPA for internal use by the [YachtShop](https://github.com/RoundedToken/yacht_shop) administration. Provides flexible functionality for analyzing the store's turnover

## Technologies

### Front-end stack

<p>
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop_admin/assets/117864556/b3ae4356-16be-454d-97dd-1d5d30f49413'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop_admin/assets/117864556/fd48382d-8694-473e-a4ed-5edc62f1da6b'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop_admin/assets/117864556/fdcc9377-62cb-4c87-9349-6ef598ad74d2'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop_admin/assets/117864556/e07ce933-b1b4-4fe6-a759-c50895addf6d'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://user-images.githubusercontent.com/117864556/231823330-a690159b-92b3-4127-a6f2-52ef8356371e.svg'/>


### Back-end stack

<p>
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop_admin/assets/117864556/b3ae4356-16be-454d-97dd-1d5d30f49413'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://user-images.githubusercontent.com/117864556/231824252-08d1c71a-1e9c-492a-9762-e72268ab52b8.svg'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop_admin/assets/117864556/e2e010b3-4281-4e3c-a4a0-ea1d065861bb'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop_admin/assets/117864556/b97fbc98-d9c9-4179-b416-e6eccc6c8de8'/>

### IaC and CI/CD
<p>
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop/assets/117864556/9d33c06d-9eec-402f-b901-df0678630a27'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop/assets/117864556/aeaebabf-088b-4abe-bf5f-e11881ca983c'/>
&emsp;
<img background-color='#ECD53F' width='64' src='https://github.com/RoundedToken/yacht_shop/assets/117864556/cfb831eb-8c68-49b2-bbb9-c880f74c3850'/>

## About the work done

### General

- Implemented interconnected order and product tables with `configurable pagination`, `sorting of all columns`, `column display settings` and `summaries for key columns`
- Supports `6 types of filters`, including a complex `time slice filter`, which involves non-trivial `work with dates`
- All table functionality is also implemented on the server side, which provides great `application performance`
- An order page and links from tables to products and categories of the [YachtShop](https://github.com/RoundedToken/yacht_shop) are also implemented

### Back-end

- Designed a `multilayer architecture` with `routing`, `controllers` and application `services` on the `Express framework`
- Wrote complex `SQL queries` in native `MS SQL` query language
- Applied best practices like `code reuse`, `isolation` and `parallelization of asynchronous operations`
- Covered all scenarios with `34 isolated integration tests` 

### Front-end

- Designed a minimalist frontend using a minimum of libraries on a performant `Vite + Preact` stack
- Implemented 6 `custom hooks`, including useFetch with generic type, loading and error states
- Implemented a tables using the TanStack Table v8 library
