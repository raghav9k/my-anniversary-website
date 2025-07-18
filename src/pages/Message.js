import React from 'react';
import { Container, Card, Title, Text, Group } from '@mantine/core';
import './Countdown.css'; // Reuse for palette/fonts

const myImg = process.env.PUBLIC_URL + '/meandgone.jpg';
const gfImg = process.env.PUBLIC_URL + '/meandgtwo.jpg'; // Replace with your girlfriend's image if you have a better one

function Message() {
  return (
    <Container className="countdown-container" size="xs">
      <Card shadow="md" padding="xl" radius="md" className="countdown-card" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', paddingTop: '2.5rem' }}>
        <Group position="center" spacing="xl" style={{ marginBottom: '2rem', justifyContent: 'center' }}>
          <img src={myImg} alt="Me" style={{ width: 320, height: 320, borderRadius: 40, objectFit: 'cover', boxShadow: '0 12px 48px #ffb6b9a0', border: '6px solid #ffb6b9' }} />
          <img src={gfImg} alt="Her" style={{ width: 320, height: 320, borderRadius: 40, objectFit: 'cover', boxShadow: '0 12px 48px #ffb6b9a0', border: '6px solid #ffb6b9' }} />
        </Group>
        <Title order={2} mb="md" className="countdown-title" style={{ fontSize: '2.2rem' }}>
          Happy Anniversary, My Love!
        </Title>
        <div style={{ maxHeight: 180, overflowY: 'auto', marginBottom: '1.5rem', padding: '0.5rem 0.5rem', background: '#ffe5ec', borderRadius: 18, boxShadow: '0 2px 12px #ffb6b933' }}>
          <Text size="lg" style={{ fontFamily: 'Pacifico, Poppins, cursive', color: '#d72660', fontSize: '1.05rem', lineHeight: 1.7 }}>
            I cannot believe it has only been an year of us being together, it feels super quick yet feels like I have spent a lifetime with you.<br /><br />
            All because you are the most understanding and empathatic individual I know of, someone who has expanded my horizons in ways I didnt know was possible.<br /><br />
            From your big wide smile, to your tantrums to your drama all the way to your big wide ass, I have never loved anyone so wholely.<br /><br />
            I hope this is just a trailer to what will be a lifetime together, and if it is I am here for it, with my popcorn, waiting for the movie.<br /><br />
            I love you so much, but I know you will always love me so much more.<br /><br />
            Thankyou for making peace with things I was in conflict with, being with you, accepted by you, cherished by you has made me comfortable in my skin as a man but also comfortable against your skin as a chipkoo.<br /><br />
            Thankyou for coming into my life.
          </Text>
        </div>
        <Text size="md" style={{ color: '#43aa8b', fontFamily: 'Poppins, cursive', marginBottom: '0.5rem', fontWeight: 600 }}>
          Yours lovingly,<br />Raghav
        </Text>
      </Card>
    </Container>
  );
}

export default Message;
