export default function DescriptionBox({text}: {text: string}) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
        padding: '5px',
        paddingLeft: '20px',
        borderTopLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
      }}
    >
      <p
        style={{
          fontStyle: 'italic',
          marginTop: '5px',
          paddingTop: '0px',
        }}
      >
        {text}
      </p>
    </div>
  )
}
