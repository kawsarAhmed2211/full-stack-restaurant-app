export default function SectionHeader({ subheader, mainheader }) {
    return (
        <>
            <div className="text-center mt-2 pt-20">
                <h3 className="uppercase text-grey-600 font-semibold leading-3"> {subheader}</h3>
                <h3 className="text-red-600 font-bold text-4xl">{mainheader}</h3>
            </div>
        </>
    );
}
