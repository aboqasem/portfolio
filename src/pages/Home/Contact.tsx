import React from 'react';
import { IconButton, SvgIconTypeMap } from '@material-ui/core';
import { CallTwoTone, GitHub, MailOutline, WhatsApp } from '@material-ui/icons';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { tLightTheme } from '../../styles/themes';
import HomeSection from '../../components/HomeSection';
import { sListItemIconIconStyle } from '../../styles/styles';

interface IContact {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  url: string;
  color: string;
}

const myContacts: IContact[] = [
  {
    name: 'Call me',
    icon: CallTwoTone,
    url: 'tel:+60176495945',
    color: '#000',
  },
  {
    name: 'Email',
    icon: MailOutline,
    url: 'mailto:mb.alzouabi@gmail.com',
    color: '#E65A4D',
  },
  {
    name: 'WhatsApp',
    icon: WhatsApp,
    url: 'https://wa.me/60176495945',
    color: '#05E776',
  },
  {
    name: 'GitHub',
    icon: GitHub,
    url: 'https://github.com/aboqasem',
    color: '#24292E',
  },
];

const Contact = (): JSX.Element => {
  return (
    <HomeSection theme={tLightTheme} title={'Get in Touch!'}>
      <div style={{ textAlign: 'center' }}>
        {myContacts.map((value) => {
          return (
            <IconButton
              key={value.url}
              href={value.url}
              target={'_blank'}
              style={{
                margin: 'clamp(5px, 2.5vw, 35px)',
                border: `2px solid ${value.color}`,
              }}
            >
              <value.icon style={{ ...sListItemIconIconStyle.large, color: value.color }} />
            </IconButton>
          );
        })}
      </div>
    </HomeSection>
  );
};

export default Contact;
