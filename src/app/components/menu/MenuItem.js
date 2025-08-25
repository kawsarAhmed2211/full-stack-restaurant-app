export default function MenuItem() {
    return(
        <>

            <div className="bg-red-300 p-4 rounded-lg text-center mt-9
            hover:bg-black">
                <img src="/pizza2.png" alt="pizza" className="mx-auto"/>
                <h4 className="font-semibold">Pepperoni Pizza</h4>
                <p className="text-sm text-red-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-full mt-2">Order Now</button>
            </div>
        </>
    );
}

{/*
  * never use hover: bg-black instead use hover:bg-black
  * because hover: bg-black will not work in tailwindcss v3.0 and above
  * also use inspect to figure out what is going on behind the scenes
*/}